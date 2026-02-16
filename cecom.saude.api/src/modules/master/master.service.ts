import { prisma } from "../../db/prisma";
import { MasterCreateInput, MasterUpdateInput } from "./master.dto";

export class MasterService {
  async listar() {
    return prisma.master.findMany({
      orderBy: [{ nome: "asc" }, { id: "asc" }],
    });
  }

  async criar(data: MasterCreateInput) {
    return prisma.master.create({
      data: {
        nome: data.nome,
        stInativo: data.stInativo ?? "N",
      },
    });
  }

  async atualizar(id: number, data: MasterUpdateInput) {
    return prisma.master.update({
      where: { id },
      data,
    });
  }

  async inativar(id: number) {
    return prisma.master.update({
      where: { id },
      data: { stInativo: "S" },
    });
  }

  async excluir(id: number) {
    return prisma.master.delete({
      where: { id },
    });
  }
}
