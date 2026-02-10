import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/db/prisma";

async function main() {
  const master = await prisma.master.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, nome: "PUBLIC" },
  });

  async function criaUsuario(email: string, role: "ADMIN" | "LEITURA") {
    const exists = await prisma.usuarioAuth.findUnique({
      where: {
        cdMaster_email: { cdMaster: master.id, email },
      },
    });

    if (!exists) {
      await prisma.usuarioAuth.create({
        data: {
          cdMaster: master.id,
          email,
          senhaHash: await bcrypt.hash("admin123", 10),
          role,
        },
      });
      console.log(`✔ Usuário ${email} criado`);
    } else {
      console.log(`ℹ Usuário ${email} já existe`);
    }
  }

  await criaUsuario("admin@cecom.local", "ADMIN");
  await criaUsuario("leitura@cecom.local", "LEITURA");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
