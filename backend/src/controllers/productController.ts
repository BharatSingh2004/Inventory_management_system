import { Request, Response } from "express";
import { productService } from "../services/productService";

export class ProductController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const { quantity } = req.body;
      const product = await productService.updateStock(parseInt(req.params.id as string), quantity);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await productService.deleteProduct(parseInt(req.params.id as string));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const productController = new ProductController();
