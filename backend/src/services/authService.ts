import prisma from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret_inventory_jwt_key";

export class AuthService {
  async register(username: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
    return user;
  }

  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error("Invalid username or password");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid username or password");

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }
}

export const authService = new AuthService();
