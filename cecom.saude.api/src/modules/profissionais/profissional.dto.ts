import { z } from "zod";

export const ProfissionalCreateDTO = z.object({
  cdMaster: z.number().int().positive(),
  nome: z.string().min(3).max(120),

  sexo: z.enum(["M", "F", "I"]).optional(),
  conselho: z.string().max(30).optional(),

  stInativo: z.enum(["S", "N"]).optional(),
  cdOcupacao: z.number().int().positive().optional(),
});

export type ProfissionalCreateInput = z.infer<typeof ProfissionalCreateDTO>;
