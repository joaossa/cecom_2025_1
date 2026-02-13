import { prisma } from "../../db/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(email: string, senha: string) {
    console.log("JWT_SECRET definido?", !!process.env.JWT_SECRET, "len=", process.env.JWT_SECRET?.length);
    const usuario = await prisma.usuarioAuth.findUnique({
      where: {
        cdMaster_email: {
          cdMaster: 1,
          email: email,
        },
      },
    });

    if (!usuario) {
      throw new Error("E-mail ou senha inválidos");
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senhaHash);
    console.log("bcrypt.compare =", senhaOk);
    if (!senhaOk) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      {
        sub: usuario.id.toString(),
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
