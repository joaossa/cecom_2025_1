import { z } from "zod";

export const LoginDTO = z.object({
  email: z.string().trim().toLowerCase().email(),
  senha: z.string().min(6),
});

export const RegisterDTO = z
  .object({
    cdMaster: z.number().int().positive(),
    email: z.string().trim().toLowerCase().email(),
    senha: z
      .string()
      .min(8, "A senha deve ter ao menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve ter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve ter ao menos uma letra minúscula")
      .regex(/\d/, "A senha deve ter ao menos um número"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    path: ["confirmarSenha"],
    message: "As senhas não coincidem",
  });

export const RecoveryRequestDTO = z.object({
  cdMaster: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
});

export type LoginInput = z.infer<typeof LoginDTO>;
export type RegisterInput = z.infer<typeof RegisterDTO>;
export type RecoveryRequestInput = z.infer<typeof RecoveryRequestDTO>;

