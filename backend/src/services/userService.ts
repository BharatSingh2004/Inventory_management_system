import prisma from "../prisma";

export class UserService {
  async getAllUsers() {
    return prisma.user.findMany({ select: { id: true, username: true, role: true } });
  }
}

export const userService = new UserService();
