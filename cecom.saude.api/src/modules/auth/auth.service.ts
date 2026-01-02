import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(email: string, senha: string) {
    const usuario = await prisma.usuarioAuth.findFirst({
      where: { email },
    });

    if (!usuario) {
      throw new Error("Credenciais inválidas");
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaOk) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      {
        sub: usuario.id,
        role: usuario.role,
        cdMaster: usuario.cdMaster,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        role: usuario.role,
        cdMaster: usuario.cdMaster,
      },
    };
  }
}
