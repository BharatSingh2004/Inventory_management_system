import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { authenticate, requireStaffOrAdmin } from "../middleware/auth";

const router = Router();

router.use(authenticate);

// Staff and Admin can view all orders and update them
router.get("/", requireStaffOrAdmin, orderController.getAll);
router.post("/", requireStaffOrAdmin, (req, res) => orderController.create(req, res));
router.patch("/:id/status", requireStaffOrAdmin, (req, res) => orderController.updateStatus(req, res));

export default router;
