"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterService = void 0;
const prisma_1 = require("../../db/prisma");
class MasterService {
    async listar() {
        return prisma_1.prisma.master.findMany({
            orderBy: [{ nome: "asc" }, { id: "asc" }],
        });
    }
    async criar(data) {
        return prisma_1.prisma.master.create({
            data: {
                nome: data.nome,
                stInativo: data.stInativo ?? "N",
            },
        });
    }
    async atualizar(id, data) {
        return prisma_1.prisma.master.update({
            where: { id },
            data,
        });
    }
    async inativar(id) {
        return prisma_1.prisma.master.update({
            where: { id },
            data: { stInativo: "S" },
        });
    }
    async excluir(id) {
        return prisma_1.prisma.master.delete({
            where: { id },
        });
    }
}
exports.MasterService = MasterService;
//# sourceMappingURL=master.service.js.map