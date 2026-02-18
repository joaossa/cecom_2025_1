"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CidadeService = void 0;
const prisma_1 = require("../../db/prisma");
class CidadeService {
    async listar() {
        return prisma_1.prisma.cidade.findMany({
            orderBy: [{ descricao: "asc" }, { id: "asc" }],
        });
    }
    async criar(data) {
        return prisma_1.prisma.cidade.create({
            data: {
                descricao: data.descricao,
                cdUf: data.cdUf,
                cdPais: data.cdPais,
                cepGeral: data.cepGeral ?? null,
                cdIbge: data.cdIbge ?? null,
            },
        });
    }
    async atualizar(id, data) {
        return prisma_1.prisma.cidade.update({
            where: { id },
            data: {
                descricao: data.descricao,
                cdUf: data.cdUf,
                cdPais: data.cdPais,
                cepGeral: data.cepGeral,
                cdIbge: data.cdIbge,
            },
        });
    }
    async excluir(id) {
        return prisma_1.prisma.cidade.delete({ where: { id } });
    }
    async contarDependencias(id) {
        const [totalDistritos, totalBairros, totalEnderecos, totalEndPaciente, totalEndProfissional] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.distrito.count({ where: { cdCidade: id } }),
            prisma_1.prisma.bairro.count({ where: { cdCidade: id } }),
            prisma_1.prisma.endereco.count({ where: { cdCidade: id } }),
            prisma_1.prisma.enderecoPaciente.count({ where: { endereco: { cdCidade: id } } }),
            prisma_1.prisma.enderecoProfissional.count({ where: { endereco: { cdCidade: id } } }),
        ]);
        return { totalDistritos, totalBairros, totalEnderecos, totalEndPaciente, totalEndProfissional };
    }
}
exports.CidadeService = CidadeService;
//# sourceMappingURL=cidade.service.js.map