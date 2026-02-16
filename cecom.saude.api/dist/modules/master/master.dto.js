"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterUpdateDTO = exports.MasterCreateDTO = void 0;
const zod_1 = require("zod");
const masterNomeRegex = /^[\p{L}\p{N} ]+$/u;
exports.MasterCreateDTO = zod_1.z.object({
    nome: zod_1.z
        .string()
        .trim()
        .min(1, "O nome da organizacao e obrigatorio")
        .max(120, "O nome deve ter no maximo 120 caracteres")
        .regex(masterNomeRegex, "O nome deve conter apenas caracteres alfanumericos"),
    stInativo: zod_1.z.enum(["S", "N"]).optional(),
});
exports.MasterUpdateDTO = zod_1.z
    .object({
    nome: zod_1.z
        .string()
        .trim()
        .min(1, "O nome da organizacao e obrigatorio")
        .max(120, "O nome deve ter no maximo 120 caracteres")
        .regex(masterNomeRegex, "O nome deve conter apenas caracteres alfanumericos")
        .optional(),
    stInativo: zod_1.z.enum(["S", "N"]).optional(),
})
    .refine((data) => data.nome !== undefined || data.stInativo !== undefined, {
    message: "Informe ao menos um campo para atualizacao",
});
//# sourceMappingURL=master.dto.js.map