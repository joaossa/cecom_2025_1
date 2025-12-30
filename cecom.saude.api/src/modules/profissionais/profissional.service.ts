import prisma from "../../config/prisma";
import { ProfissionalCreateInput } from "./profissional.dto";

export class ProfissionalService {
  async criar(data: ProfissionalCreateInput) {
    return prisma.profissional.create({ data });
  }

  async listar() {
    return prisma.profissional.findMany({
      include: {
        enderecos: true,
        contatos: true,
      },
    });
  }

  // ✅ aqui o correto: cdMaster + id do profissional
  async buscarPorId(cdMaster: number, id: number) {
    return prisma.profissional.findFirst({
      where: { cdMaster, id },
      include: {
        enderecos: true,
        contatos: true,
      },
    });
  }
}
