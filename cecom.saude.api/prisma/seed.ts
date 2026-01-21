import "dotenv/config";
import prisma from "../src/config/prisma";
import * as bcrypt from "bcryptjs";

async function main() {
  // 1️⃣ Garante que o Master existe
  const master = await prisma.master.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nome: "CECOM",
    },
  });

  const senhaPadrao = await bcrypt.hash("admin123", 10);

  // 2️⃣ Lista de usuários que devem existir
  const usuarios = [
    {
      email: "admin@cecom.local",
      role: "ADMIN" as const,
    },
    {
      email: "leitura@cecom.local",
      role: "LEITURA" as const,
    },
  ];

  // 3️⃣ Criação idempotente dos usuários
  for (const usuario of usuarios) {
    const exists = await prisma.usuarioAuth.findUnique({
      where: {
        cdMaster_email: {
          cdMaster: master.id,
          email: usuario.email,
        },
      },
    });

    if (!exists) {
      await prisma.usuarioAuth.create({
        data: {
          cdMaster: master.id,
          email: usuario.email,
          senhaHash: senhaPadrao,
          role: usuario.role,
        },
      });

      console.log(`✔ Usuário ${usuario.email} criado (${usuario.role})`);
    } else {
      console.log(`ℹ Usuário ${usuario.email} já existe`);
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
