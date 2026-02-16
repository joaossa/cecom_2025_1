"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionalService = void 0;
const prisma_1 = require("../../db/prisma");
class ProfissionalService {
    async criar(data) {
        return prisma_1.prisma.profissional.create({ data });
    }
    async listar() {
        return prisma_1.prisma.profissional.findMany({
            include: {
                enderecos: { include: { endereco: true } },
                contatos: { include: { contato: true } },
                ocupacao: true, // opcional, mas útil
                master: true, // opcional, mas útil
            },
        });
    }
    // ✅ aqui o correto: cdMaster + id do profissional
    async buscarPorId(cdMaster, id) {
        return prisma_1.prisma.profissional.findFirst({
            where: { id, cdMaster },
        });
    }
}
exports.ProfissionalService = ProfissionalService;
//# sourceMappingURL=profissional.service.js.map