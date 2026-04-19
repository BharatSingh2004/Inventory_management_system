import { Router } from "express";
import { productController } from "../controllers/productController";
import { authenticate, requireAdmin, requireStaffOrAdmin } from "../middleware/auth";

const router = Router();

// Only authenticated users can see products
router.get("/", authenticate, productController.getAll);

// Only admins can create products
router.post("/", authenticate, requireAdmin, (req, res) => productController.create(req, res));

// Both admins and staff can update stock
router.patch("/:id/stock", authenticate, requireStaffOrAdmin, (req, res) => productController.updateStock(req, res));

// Admin can delete products
router.delete("/:id", authenticate, requireAdmin, (req, res) => productController.delete(req, res));

export default router;
