import prisma from "../prisma";

export class ProductService {
  async getAllProducts() {
    return prisma.product.findMany({ include: { category: true, supplier: true } });
  }

  async addProduct(data: any) {
    return prisma.product.create({ data });
  }

  async updateStock(id: number, quantity: number) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");
    return prisma.product.update({
      where: { id },
      data: { stockQuantity: product.stockQuantity + quantity },
    });
  }

  async deleteProduct(id: number) {
    return prisma.product.delete({ where: { id } });
  }
}

export const productService = new ProductService();
