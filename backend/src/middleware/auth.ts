import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret_inventory_jwt_key";

export interface AuthRequest extends Request {
  user?: { id: number; role: string; username: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string; username: string };
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token." });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ error: "Access denied. Admin role required." });
    return;
  }
  next();
};

export const requireStaffOrAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "STAFF" && req.user?.role !== "ADMIN") {
    res.status(403).json({ error: "Access denied. Staff or Admin role required." });
    return;
  }
  next();
};
