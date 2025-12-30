import "dotenv/config";
import app from "./app";
import prisma from "./config/prisma";

const PORT = Number(process.env.PORT ?? 3000);

async function bootstrap() {
  await prisma.$connect();
  console.log("Prisma conectado com sucesso.");

  app.listen(PORT, () => {
    console.log(`🚀 API CECOM rodando na porta ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Falha ao iniciar a API:", err);
  process.exit(1);
});
