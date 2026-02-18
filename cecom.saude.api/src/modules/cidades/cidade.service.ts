import { prisma } from "../../db/prisma";
import { CidadeCreateInput, CidadeUpdateInput } from "./cidade.dto";

export class CidadeService {
  async listar() {
    return prisma.cidade.findMany({
      orderBy: [{ descricao: "asc" }, { id: "asc" }],
    });
  }

  async criar(data: CidadeCreateInput) {
    return prisma.cidade.create({
      data: {
        descricao: data.descricao,
        cdUf: data.cdUf,
        cdPais: data.cdPais,
        cepGeral: data.cepGeral ?? null,
        cdIbge: data.cdIbge ?? null,
      },
    });
  }

  async atualizar(id: number, data: CidadeUpdateInput) {
    return prisma.cidade.update({
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

  async excluir(id: number) {
    return prisma.cidade.delete({ where: { id } });
  }

  async contarDependencias(id: number) {
    const [totalDistritos, totalBairros, totalEnderecos, totalEndPaciente, totalEndProfissional] =
      await prisma.$transaction([
        prisma.distrito.count({ where: { cdCidade: id } }),
        prisma.bairro.count({ where: { cdCidade: id } }),
        prisma.endereco.count({ where: { cdCidade: id } }),
        prisma.enderecoPaciente.count({ where: { endereco: { cdCidade: id } } }),
        prisma.enderecoProfissional.count({ where: { endereco: { cdCidade: id } } }),
      ]);

    return { totalDistritos, totalBairros, totalEnderecos, totalEndPaciente, totalEndProfissional };
  }
}
