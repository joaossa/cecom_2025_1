"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteCreateDTO = void 0;
const zod_1 = require("zod");
exports.PacienteCreateDTO = zod_1.z.object({
    cdMaster: zod_1.z.number(),
    cdPaciente: zod_1.z.number(),
    nome: zod_1.z.string().min(3),
    sexo: zod_1.z.enum(["M", "F", "I"]).optional(),
    dtNascimento: zod_1.z.string().optional(),
    stInativo: zod_1.z.enum(["S", "N"]).optional(),
    cdEscolaridade: zod_1.z.number().optional(),
    cdOcupacao: zod_1.z.number().optional(),
});
//# sourceMappingURL=paciente.dto.js.map