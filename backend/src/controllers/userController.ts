import { Request, Response } from "express";
import { userService } from "../services/userService";

export class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
