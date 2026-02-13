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
          email,
        },
      },
    });

    if (!usuario) {
      throw new Error("E-mail ou senha inválidos");
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senhaHash);
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
  async register(cdMaster: number, email: string, senha: string) {
    const master = await prisma.master.findUnique({ where: { id: cdMaster } });

    if (!master || master.stInativo === "S") {
      throw new Error("Master inválido ou inativo");
    }

    const existe = await prisma.usuarioAuth.findUnique({
      where: {
        cdMaster_email: {
          cdMaster,
          email,
        },
      },
    });

    if (existe) {
      throw new Error("Já existe usuário com esse e-mail neste Master");
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    await prisma.usuarioAuth.create({
      data: {
        cdMaster,
        email,
        senhaHash,
        role: "PROFISSIONAL",
      },
    });

    return { message: "Conta criada com sucesso. Faça login para continuar." };
  }

  async requestPasswordRecovery(cdMaster: number, email: string) {
    const usuario = await prisma.usuarioAuth.findUnique({
      where: {
        cdMaster_email: {
          cdMaster,
          email,
        },
      },
    });

    if (usuario) {
      console.info(
        `[auth] Solicitação de recuperação para usuário ${usuario.id} (master ${cdMaster}). Configure envio de e-mail com token de uso único.`
      );
    }

    return {
      message:
        "Se existir uma conta para esse e-mail, você receberá instruções de recuperação.",
    };
  }
}
