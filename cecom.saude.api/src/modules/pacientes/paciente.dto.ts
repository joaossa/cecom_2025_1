import { z } from "zod";

export const PacienteCreateDTO = z.object({
  cdMaster: z.number(),
  cdPaciente: z.number(),
  nome: z.string().min(3),
  sexo: z.enum(["M", "F", "I"]).optional(),
  dtNascimento: z.string().optional(),
  stInativo: z.enum(["S", "N"]).optional(),
  cdEscolaridade: z.number().optional(),
  cdOcupacao: z.number().optional(),
});

export type PacienteCreateInput = z.infer<typeof PacienteCreateDTO>;
