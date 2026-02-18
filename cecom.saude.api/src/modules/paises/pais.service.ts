import { prisma } from "../../db/prisma";
import { PaisCreateInput, PaisUpdateInput } from "./pais.dto";

export class PaisService {
  async listar() {
    return prisma.pais.findMany({
      orderBy: [{ descricao: "asc" }, { id: "asc" }],
    });
  }

  async criar(data: PaisCreateInput) {
    return prisma.pais.create({
      data: {
        descricao: data.descricao,
        nacionalidade: data.nacionalidade ?? null,
        cdIbge: data.cdIbge ?? null,
      },
    });
  }

  async atualizar(id: number, data: PaisUpdateInput) {
    return prisma.pais.update({
      where: { id },
      data: {
        descricao: data.descricao,
        nacionalidade: data.nacionalidade,
        cdIbge: data.cdIbge,
      },
    });
  }

  async excluir(id: number) {
    return prisma.pais.delete({
      where: { id },
    });
  }

  async contarVinculosEndereco(id: number) {
    const [totalEndPaciente, totalEndProfissional] = await prisma.$transaction([
      prisma.enderecoPaciente.count({
        where: {
          endereco: {
            cidade: {
              cdPais: id,
            },
          },
        },
      }),
      prisma.enderecoProfissional.count({
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
