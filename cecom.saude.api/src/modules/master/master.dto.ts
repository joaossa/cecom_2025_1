import { z } from "zod";

const masterNomeRegex = /^[\p{L}\p{N} ]+$/u;

export const MasterCreateDTO = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "O nome da organizacao e obrigatorio")
    .max(120, "O nome deve ter no maximo 120 caracteres")
    .regex(masterNomeRegex, "O nome deve conter apenas caracteres alfanumericos"),
  stInativo: z.enum(["S", "N"]).optional(),
});

export const MasterUpdateDTO = z
  .object({
    nome: z
      .string()
      .trim()
      .min(1, "O nome da organizacao e obrigatorio")
      .max(120, "O nome deve ter no maximo 120 caracteres")
      .regex(masterNomeRegex, "O nome deve conter apenas caracteres alfanumericos")
      .optional(),
    stInativo: z.enum(["S", "N"]).optional(),
  })
  .refine((data) => data.nome !== undefined || data.stInativo !== undefined, {
    message: "Informe ao menos um campo para atualizacao",
  });

export type MasterCreateInput = z.infer<typeof MasterCreateDTO>;
export type MasterUpdateInput = z.infer<typeof MasterUpdateDTO>;
