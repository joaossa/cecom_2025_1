"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("../../db/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async login(cdMaster, email, senha) {
        const usuario = await prisma_1.prisma.usuarioAuth.findUnique({
            where: {
                cdMaster_email: {
                    cdMaster,
                    email,
                },
            },
        });
        if (!usuario) {
            throw new Error("E-mail ou senha inválidos");
        }
        const senhaOk = await bcryptjs_1.default.compare(senha, usuario.senhaHash);
        if (!senhaOk) {
            throw new Error("Credenciais inválidas");
        }
        const token = jsonwebtoken_1.default.sign({
            sub: usuario.id.toString(),
            role: usuario.role,
            cdMaster: usuario.cdMaster,
        }, process.env.JWT_SECRET, { expiresIn: "8h" });
        return {
            token,
            usuario: {
                id: usuario.id,
                role: usuario.role,
                cdMaster: usuario.cdMaster,
            },
        };
    }
    async register(cdMaster, email, senha) {
        const master = await prisma_1.prisma.master.findUnique({ where: { id: cdMaster } });
        if (!master || master.stInativo === "S") {
            throw new Error("Master inválido ou inativo");
        }
        const existe = await prisma_1.prisma.usuarioAuth.findUnique({
            where: {
                cdMaster_email: {
                    cdMaster,
                    email,
                },
            },
        });
        if (existe) {
            throw new Error("Já existe usuário com esse e-mail neste Master");
        }
        const senhaHash = await bcryptjs_1.default.hash(senha, 12);
        await prisma_1.prisma.usuarioAuth.create({
            data: {
                cdMaster,
                email,
                senhaHash,
                role: "PROFISSIONAL",
            },
        });
        return { message: "Conta criada com sucesso. Faça login para continuar." };
    }
    async requestPasswordRecovery(cdMaster, email) {
        const usuario = await prisma_1.prisma.usuarioAuth.findUnique({
            where: {
                cdMaster_email: {
                    cdMaster,
                    email,
                },
            },
        });
        if (usuario) {
            console.info(`[auth] Solicitação de recuperação para usuário ${usuario.id} (master ${cdMaster}). Configure envio de e-mail com token de uso único.`);
        }
        return {
            message: "Se existir uma conta para esse e-mail, você receberá instruções de recuperação.",
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map