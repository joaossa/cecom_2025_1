import prisma from "../../config/prisma";
import { PacienteCreateInput } from "./paciente.dto";

export class PacienteService {
  async criar(data: PacienteCreateInput) {
    return prisma.paciente.create({
      data,
    });
  }

  async listar() {
    return prisma.paciente.findMany({
      include: {
        enderecos: true,
        contatos: true,
      },
    });
  }

  async buscarPorId(cdMaster: number, cdPaciente: number) {
    return prisma.paciente.findUnique({
      where: { cdMaster_cdPaciente: { cdMaster, cdPaciente } },
    });
  }
}
