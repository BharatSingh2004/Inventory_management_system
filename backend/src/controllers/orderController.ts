import { Request, Response } from "express";
import { orderService } from "../services/orderService";

export class OrderController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const { items } = req.body;
      const order = await orderService.createOrder(user.id, items);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(parseInt(req.params.id), status);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const orderController = new OrderController();
