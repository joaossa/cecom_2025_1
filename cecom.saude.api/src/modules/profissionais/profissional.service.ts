import { prisma } from "../../db/prisma";
import { ProfissionalCreateInput } from "./profissional.dto";

export class ProfissionalService {
  async criar(data: ProfissionalCreateInput) {
    return prisma.profissional.create({ data });
  }

  async listar() {
    return prisma.profissional.findMany({
      include: {
        enderecos: { include: { endereco: true } },
        contatos: { include: { contato: true } },
        ocupacao: true, // opcional, mas útil
        master: true,   // opcional, mas útil
      },
    });
  }

  // ✅ aqui o correto: cdMaster + id do profissional
  async buscarPorId(cdMaster: number, id: number) {
    return prisma.profissional.findFirst({
      where: { id, cdMaster },
    });
  }
  
}
