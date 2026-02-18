"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadeFederacaoService = void 0;
const prisma_1 = require("../../db/prisma");
class UnidadeFederacaoService {
    async listar() {
        return prisma_1.prisma.unidadeFederacao.findMany({
            orderBy: [{ descricao: "asc" }, { id: "asc" }],
        });
    }
    async criar(data) {
        return prisma_1.prisma.unidadeFederacao.create({
            data: {
                id: data.id,
                descricao: data.descricao,
                cdIbge: data.cdIbge ?? null,
                pais: {
                    connect: { id: data.cdPais },
                },
            },
        });
    }
    async atualizar(id, data) {
        return prisma_1.prisma.unidadeFederacao.update({
            where: { id },
            data: {
                descricao: data.descricao,
                cdIbge: data.cdIbge,
                pais: data.cdPais
                    ? {
                        connect: { id: data.cdPais },
                    }
                    : undefined,
            },
        });
    }
    async excluir(id) {
        return prisma_1.prisma.unidadeFederacao.delete({
            where: { id },
        });
    }
    async contarVinculosEndereco(id) {
        const [totalEndPaciente, totalEndProfissional] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.enderecoPaciente.count({
                where: {
                    endereco: {
                        cidade: {
                            cdUf: id,
                        },
                    },
                },
            }),
            prisma_1.prisma.enderecoProfissional.count({
                where: {
                    endereco: {
                        cidade: {
                            cdUf: id,
                        },
                    },
                },
            }),
        ]);
        return { totalEndPaciente, totalEndProfissional };
    }
}
exports.UnidadeFederacaoService = UnidadeFederacaoService;
//# sourceMappingURL=unidade-federacao.service.js.map