import prisma from "../../config/prisma";

export class PacienteService {
  async criar(data: any) {
    return prisma.paciente.create({
      data,
    });
  }

  async listar() {
    return prisma.paciente.findMany();
  }
}
