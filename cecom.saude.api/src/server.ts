import "dotenv/config";
import app from "./app";
import { prisma } from "./db/prisma";

async function bootstrap() {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("FATAL: JWT_SECRET não definido no .env");
      process.exit(1);
    }
    await prisma.$connect();
    console.log("✅ Prisma conectado");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar a API:", error);
    process.exit(1);
  }
}

bootstrap();
