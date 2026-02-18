import { z } from "zod";

const ufTextoRegex = /^[\p{L}\p{N} ]+$/u;

export const UnidadeFederacaoCreateDTO = z.object({
  id: z
    .string()
    .trim()
    .length(2, "A UF deve conter exatamente 2 caracteres")
    .regex(/^[A-Za-z]{2}$/, "A UF deve conter apenas letras")
    .transform((value) => value.toUpperCase()),
  descricao: z
    .string()
    .trim()
    .min(1, "A descricao da UF e obrigatoria")
    .max(60, "A descricao deve ter no maximo 60 caracteres")
    .regex(ufTextoRegex, "A descricao deve conter apenas caracteres alfanumericos"),
  cdIbge: z.number().int("O codigo IBGE deve ser inteiro").positive("O codigo IBGE deve ser positivo").optional().nullable(),
  cdPais: z.number().int("O pais deve ser informado").positive("O pais deve ser valido"),
});

export const UnidadeFederacaoUpdateDTO = z
  .object({
    descricao: z
      .string()
      .trim()
      .min(1, "A descricao da UF e obrigatoria")
      .max(60, "A descricao deve ter no maximo 60 caracteres")
      .regex(ufTextoRegex, "A descricao deve conter apenas caracteres alfanumericos")
      .optional(),
    cdIbge: z
      .number()
      .int("O codigo IBGE deve ser inteiro")
      .positive("O codigo IBGE deve ser positivo")
      .optional()
      .nullable(),
    cdPais: z.number().int("O pais deve ser informado").positive("O pais deve ser valido").optional(),
  })
  .refine((data) => data.descricao !== undefined || data.cdIbge !== undefined || data.cdPais !== undefined, {
    message: "Informe ao menos um campo para atualizacao",
  });

export type UnidadeFederacaoCreateInput = z.infer<typeof UnidadeFederacaoCreateDTO>;
export type UnidadeFederacaoUpdateInput = z.infer<typeof UnidadeFederacaoUpdateDTO>;
