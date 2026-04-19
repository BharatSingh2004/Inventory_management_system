import { Router } from "express";
import { userController } from "../controllers/userController";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.use(authenticate);

// Only admins can view all users
router.get("/", requireAdmin, userController.getAll);

export default router;
