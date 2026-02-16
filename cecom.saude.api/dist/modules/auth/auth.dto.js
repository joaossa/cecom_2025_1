"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryRequestDTO = exports.RegisterDTO = exports.LoginDTO = void 0;
const zod_1 = require("zod");
exports.LoginDTO = zod_1.z.object({
    cdMaster: zod_1.z.number().int().positive(),
    email: zod_1.z.string().trim().toLowerCase().email(),
    senha: zod_1.z.string().min(6),
});
exports.RegisterDTO = zod_1.z
    .object({
    cdMaster: zod_1.z.number().int().positive(),
    email: zod_1.z.string().trim().toLowerCase().email(),
    senha: zod_1.z
        .string()
        .min(8, "A senha deve ter ao menos 8 caracteres")
        .regex(/[A-Z]/, "A senha deve ter ao menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve ter ao menos uma letra minúscula")
        .regex(/\d/, "A senha deve ter ao menos um número"),
    confirmarSenha: zod_1.z.string(),
})
    .refine((data) => data.senha === data.confirmarSenha, {
    path: ["confirmarSenha"],
    message: "As senhas não coincidem",
});
exports.RecoveryRequestDTO = zod_1.z.object({
    cdMaster: zod_1.z.number().int().positive(),
    email: zod_1.z.string().trim().toLowerCase().email(),
});
//# sourceMappingURL=auth.dto.js.map