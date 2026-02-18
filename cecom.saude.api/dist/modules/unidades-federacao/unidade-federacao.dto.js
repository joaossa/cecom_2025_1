"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadeFederacaoUpdateDTO = exports.UnidadeFederacaoCreateDTO = void 0;
const zod_1 = require("zod");
const ufTextoRegex = /^[\p{L}\p{N} ]+$/u;
exports.UnidadeFederacaoCreateDTO = zod_1.z.object({
    id: zod_1.z
        .string()
        .trim()
        .length(2, "A UF deve conter exatamente 2 caracteres")
        .regex(/^[A-Za-z]{2}$/, "A UF deve conter apenas letras")
        .transform((value) => value.toUpperCase()),
    descricao: zod_1.z
        .string()
        .trim()
        .min(1, "A descricao da UF e obrigatoria")
        .max(60, "A descricao deve ter no maximo 60 caracteres")
        .regex(ufTextoRegex, "A descricao deve conter apenas caracteres alfanumericos"),
    cdIbge: zod_1.z.number().int("O codigo IBGE deve ser inteiro").positive("O codigo IBGE deve ser positivo").optional().nullable(),
    cdPais: zod_1.z.number().int("O pais deve ser informado").positive("O pais deve ser valido"),
});
exports.UnidadeFederacaoUpdateDTO = zod_1.z
    .object({
    descricao: zod_1.z
        .string()
        .trim()
        .min(1, "A descricao da UF e obrigatoria")
        .max(60, "A descricao deve ter no maximo 60 caracteres")
        .regex(ufTextoRegex, "A descricao deve conter apenas caracteres alfanumericos")
        .optional(),
    cdIbge: zod_1.z
        .number()
        .int("O codigo IBGE deve ser inteiro")
        .positive("O codigo IBGE deve ser positivo")
        .optional()
        .nullable(),
    cdPais: zod_1.z.number().int("O pais deve ser informado").positive("O pais deve ser valido").optional(),
})
    .refine((data) => data.descricao !== undefined || data.cdIbge !== undefined || data.cdPais !== undefined, {
    message: "Informe ao menos um campo para atualizacao",
});
//# sourceMappingURL=unidade-federacao.dto.js.map