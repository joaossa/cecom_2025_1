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

  // 2️⃣ Agora sim, o usuário
  const email = "admin@cecom.local";

  const exists = await prisma.usuarioAuth.findUnique({
    where: {
      cdMaster_email: {
        cdMaster: master.id,
        email,
      },
    },
  });

  if (!exists) {
    await prisma.usuarioAuth.create({
      data: {
        cdMaster: master.id,
        email,
        senhaHash: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
      },
    });

    console.log("✔ Usuário admin criado");
  } else {
    console.log("ℹ Usuário admin já existe");
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
