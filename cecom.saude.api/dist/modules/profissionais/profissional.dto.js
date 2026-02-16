"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionalCreateDTO = void 0;
const zod_1 = require("zod");
exports.ProfissionalCreateDTO = zod_1.z.object({
    cdMaster: zod_1.z.number().int().positive(),
    nome: zod_1.z.string().min(3).max(120),
    sexo: zod_1.z.enum(["M", "F", "I"]).optional(),
    conselho: zod_1.z.string().max(30).optional(),
    stInativo: zod_1.z.enum(["S", "N"]).optional(),
    cdOcupacao: zod_1.z.number().int().positive().optional(),
});
//# sourceMappingURL=profissional.dto.js.map