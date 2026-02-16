"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const prisma_1 = require("../generated/prisma");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não definido");
}
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    // se você precisa forçar o schema:
    // options: "-c search_path=public",
});
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = new prisma_1.PrismaClient({ adapter });
//# sourceMappingURL=prisma.js.map