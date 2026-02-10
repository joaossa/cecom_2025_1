import "dotenv/config";
import app from "./app";
import { prisma } from "./db/prisma";

async function bootstrap() {
  try {
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
