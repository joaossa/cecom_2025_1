import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não definido no .env");
}

const pool = new Pool({
  connectionString,
  // ✅ garante que o schema padrão é cecom (e mantém public como fallback)
  options: "-c search_path=cecom,public",
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
