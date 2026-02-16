"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const zod_1 = require("zod");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const service = new auth_service_1.AuthService();
class AuthController {
    async login(req, res) {
        const parsed = auth_dto_1.LoginDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        try {
            const result = await service.login(parsed.data.cdMaster, parsed.data.email, parsed.data.senha);
            return res.json(result);
        }
        catch (err) {
            console.error("Erro no login:", err?.message ?? err, err?.stack);
            return res.status(401).json({ message: err?.message ?? "Login inválido" });
        }
    }
    async register(req, res) {
        const parsed = auth_dto_1.RegisterDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        try {
            const result = await service.register(parsed.data.cdMaster, parsed.data.email, parsed.data.senha);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Não foi possível criar conta",
            });
        }
    }
    async requestPasswordRecovery(req, res) {
        const parsed = auth_dto_1.RecoveryRequestDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        const result = await service.requestPasswordRecovery(parsed.data.cdMaster, parsed.data.email);
        return res.status(202).json(result);
    }
    async me(req, res) {
        if (!req.user) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        return res.json({
            id: req.user.id,
            role: req.user.role,
            cdMaster: req.user.cdMaster,
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map