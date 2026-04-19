import { Request, Response } from "express";
import { authService } from "../services/authService";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, role } = req.body;
      const user = await authService.register(username, password, role);
      res.status(201).json({ id: user.id, username: user.username, role: user.role });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const data = await authService.login(username, password);
      res.json(data);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
