import { z } from "zod";

const paisTextoRegex = /^[\p{L}\p{N} ]+$/u;

export const PaisCreateDTO = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "A descricao do pais e obrigatoria")
    .max(60, "A descricao deve ter no maximo 60 caracteres")
    .regex(paisTextoRegex, "A descricao deve conter apenas caracteres alfanumericos"),
  nacionalidade: z
    .string()
    .trim()
    .max(60, "A nacionalidade deve ter no maximo 60 caracteres")
    .regex(paisTextoRegex, "A nacionalidade deve conter apenas caracteres alfanumericos")
    .optional()
    .nullable(),
  cdIbge: z.number().int("O codigo IBGE deve ser inteiro").positive("O codigo IBGE deve ser positivo").optional().nullable(),
});

export const PaisUpdateDTO = z
  .object({
    descricao: z
      .string()
      .trim()
      .min(1, "A descricao do pais e obrigatoria")
      .max(60, "A descricao deve ter no maximo 60 caracteres")
      .regex(paisTextoRegex, "A descricao deve conter apenas caracteres alfanumericos")
      .optional(),
    nacionalidade: z
      .string()
      .trim()
      .max(60, "A nacionalidade deve ter no maximo 60 caracteres")
      .regex(paisTextoRegex, "A nacionalidade deve conter apenas caracteres alfanumericos")
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
      data.nacionalidade !== undefined ||
      data.cdIbge !== undefined,
    {
      message: "Informe ao menos um campo para atualizacao",
    }
  );

export type PaisCreateInput = z.infer<typeof PaisCreateDTO>;
export type PaisUpdateInput = z.infer<typeof PaisUpdateDTO>;
