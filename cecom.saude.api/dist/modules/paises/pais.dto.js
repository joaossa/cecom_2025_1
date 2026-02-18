"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisUpdateDTO = exports.PaisCreateDTO = void 0;
const zod_1 = require("zod");
const paisTextoRegex = /^[\p{L}\p{N} ]+$/u;
exports.PaisCreateDTO = zod_1.z.object({
    descricao: zod_1.z
        .string()
        .trim()
        .min(1, "A descricao do pais e obrigatoria")
        .max(60, "A descricao deve ter no maximo 60 caracteres")
        .regex(paisTextoRegex, "A descricao deve conter apenas caracteres alfanumericos"),
    nacionalidade: zod_1.z
        .string()
        .trim()
        .max(60, "A nacionalidade deve ter no maximo 60 caracteres")
        .regex(paisTextoRegex, "A nacionalidade deve conter apenas caracteres alfanumericos")
        .optional()
        .nullable(),
    cdIbge: zod_1.z.number().int("O codigo IBGE deve ser inteiro").positive("O codigo IBGE deve ser positivo").optional().nullable(),
});
exports.PaisUpdateDTO = zod_1.z
    .object({
    descricao: zod_1.z
        .string()
        .trim()
        .min(1, "A descricao do pais e obrigatoria")
        .max(60, "A descricao deve ter no maximo 60 caracteres")
        .regex(paisTextoRegex, "A descricao deve conter apenas caracteres alfanumericos")
        .optional(),
    nacionalidade: zod_1.z
        .string()
        .trim()
        .max(60, "A nacionalidade deve ter no maximo 60 caracteres")
        .regex(paisTextoRegex, "A nacionalidade deve conter apenas caracteres alfanumericos")
        .optional()
        .nullable(),
    cdIbge: zod_1.z
        .number()
        .int("O codigo IBGE deve ser inteiro")
        .positive("O codigo IBGE deve ser positivo")
        .optional()
        .nullable(),
})
    .refine((data) => data.descricao !== undefined ||
    data.nacionalidade !== undefined ||
    data.cdIbge !== undefined, {
    message: "Informe ao menos um campo para atualizacao",
});
//# sourceMappingURL=pais.dto.js.map