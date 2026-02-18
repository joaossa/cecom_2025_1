import { z } from "zod";

const cidadeTextoRegex = /^[\p{L}\p{N} ]+$/u;

export const CidadeCreateDTO = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "A descricao da cidade e obrigatoria")
    .max(120, "A descricao deve ter no maximo 120 caracteres")
    .regex(cidadeTextoRegex, "A descricao deve conter apenas caracteres alfanumericos"),
  cdUf: z
    .string()
    .trim()
    .length(2, "A UF deve conter exatamente 2 caracteres")
    .regex(/^[A-Za-z]{2}$/, "A UF deve conter apenas letras")
    .transform((value) => value.toUpperCase()),
  cdPais: z.number().int("O pais deve ser informado").positive("O pais deve ser valido"),
  cepGeral: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, "O CEP geral deve estar no formato 99999-999")
    .optional()
    .nullable(),
  cdIbge: z.number().int("O codigo IBGE deve ser inteiro").positive("O codigo IBGE deve ser positivo").optional().nullable(),
});

export const CidadeUpdateDTO = z
  .object({
    descricao: z
      .string()
      .trim()
      .min(1, "A descricao da cidade e obrigatoria")
      .max(120, "A descricao deve ter no maximo 120 caracteres")
      .regex(cidadeTextoRegex, "A descricao deve conter apenas caracteres alfanumericos")
      .optional(),
    cdUf: z
      .string()
      .trim()
      .length(2, "A UF deve conter exatamente 2 caracteres")
      .regex(/^[A-Za-z]{2}$/, "A UF deve conter apenas letras")
      .transform((value) => value.toUpperCase())
      .optional(),
    cdPais: z.number().int("O pais deve ser informado").positive("O pais deve ser valido").optional(),
    cepGeral: z
      .string()
      .trim()
      .regex(/^\d{5}-?\d{3}$/, "O CEP geral deve estar no formato 99999-999")
      .optional()
      .nullable(),
    cdIbge: z
      .number()
      .int("O codigo IBGE deve ser inteiro")
      .positive("O codigo IBGE deve ser positivo")
      .optional()
      .nullable(),
  })
  .refine(
    (data) =>
      data.descricao !== undefined ||
      data.cdUf !== undefined ||
      data.cdPais !== undefined ||
      data.cepGeral !== undefined ||
      data.cdIbge !== undefined,
    {
      message: "Informe ao menos um campo para atualizacao",
    }
  );

export type CidadeCreateInput = z.infer<typeof CidadeCreateDTO>;
export type CidadeUpdateInput = z.infer<typeof CidadeUpdateDTO>;
