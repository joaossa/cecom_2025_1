"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisService = void 0;
const prisma_1 = require("../../db/prisma");
class PaisService {
    async listar() {
        return prisma_1.prisma.pais.findMany({
            orderBy: [{ descricao: "asc" }, { id: "asc" }],
        });
    }
    async criar(data) {
        return prisma_1.prisma.pais.create({
            data: {
                descricao: data.descricao,
                nacionalidade: data.nacionalidade ?? null,
                cdIbge: data.cdIbge ?? null,
            },
        });
    }
    async atualizar(id, data) {
        return prisma_1.prisma.pais.update({
            where: { id },
            data: {
                descricao: data.descricao,
                nacionalidade: data.nacionalidade,
                cdIbge: data.cdIbge,
            },
        });
    }
    async excluir(id) {
        return prisma_1.prisma.pais.delete({
            where: { id },
        });
    }
    async contarVinculosEndereco(id) {
        const [totalEndPaciente, totalEndProfissional] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.enderecoPaciente.count({
                where: {
                    endereco: {
                        cidade: {
                            cdPais: id,
                        },
                    },
                },
            }),
            prisma_1.prisma.enderecoProfissional.count({
                where: {
                    endereco: {
                        cidade: {
                            cdPais: id,
                        },
                    },
                },
            }),
        ]);
        return { totalEndPaciente, totalEndProfissional };
    }
}
exports.PaisService = PaisService;
//# sourceMappingURL=pais.service.js.map