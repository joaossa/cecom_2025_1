import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definido");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // se você precisa forçar o schema:
  // options: "-c search_path=public",
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
