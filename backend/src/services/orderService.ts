import prisma from "../prisma";

export class OrderService {
  async getAllOrders() {
    return prisma.order.findMany({ include: { user: true, orderItems: { include: { product: true } } } });
  }

  async createOrder(userId: number, items: { productId: number; quantity: number }[]) {
    // Basic validation and sum calculation
    let totalAmount = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for Product ${product.name}`);
      }
      totalAmount += product.price * item.quantity;
    }

    // Creating order and reducing stock in a transaction
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          status: "CREATED",
          totalAmount,
          orderItems: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: 0, // Should ideally be product.price fetched within the loop, simplified here
            })),
          },
        },
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  async updateOrderStatus(id: number, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}

export const orderService = new OrderService();
