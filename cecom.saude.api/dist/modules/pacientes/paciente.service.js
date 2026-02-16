"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteService = void 0;
const prisma_1 = require("../../db/prisma");
class PacienteService {
    async criar(data) {
        return prisma_1.prisma.paciente.create({
            data,
        });
    }
    async listar() {
        return prisma_1.prisma.paciente.findMany({
            include: {
                enderecos: true,
                contatos: true,
            },
        });
    }
    async buscarPorId(cdMaster, cdPaciente) {
        return prisma_1.prisma.paciente.findUnique({
            where: { cdMaster_cdPaciente: { cdMaster, cdPaciente } },
        });
    }
}
exports.PacienteService = PacienteService;
//# sourceMappingURL=paciente.service.js.map