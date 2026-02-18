import { prisma } from "../../db/prisma";
import { UnidadeFederacaoCreateInput, UnidadeFederacaoUpdateInput } from "./unidade-federacao.dto";

export class UnidadeFederacaoService {
  async listar() {
    return prisma.unidadeFederacao.findMany({
      orderBy: [{ descricao: "asc" }, { id: "asc" }],
    });
  }

  async criar(data: UnidadeFederacaoCreateInput) {
    return prisma.unidadeFederacao.create({
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

  async atualizar(id: string, data: UnidadeFederacaoUpdateInput) {
    return prisma.unidadeFederacao.update({
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

  async excluir(id: string) {
    return prisma.unidadeFederacao.delete({
      where: { id },
    });
  }

  async contarVinculosEndereco(id: string) {
    const [totalEndPaciente, totalEndProfissional] = await prisma.$transaction([
      prisma.enderecoPaciente.count({
        where: {
          endereco: {
            cidade: {
              cdUf: id,
            },
          },
        },
      }),
      prisma.enderecoProfissional.count({
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
