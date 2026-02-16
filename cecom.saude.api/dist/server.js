"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./db/prisma");
async function bootstrap() {
    try {
        if (!process.env.JWT_SECRET) {
            console.error("FATAL: JWT_SECRET não definido no .env");
            process.exit(1);
        }
        await prisma_1.prisma.$connect();
        console.log("✅ Prisma conectado");
        const PORT = process.env.PORT || 3001;
        app_1.default.listen(PORT, () => {
            console.log(`🚀 API rodando na porta ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Falha ao iniciar a API:", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=server.js.map