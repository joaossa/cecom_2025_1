"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfissionalController = void 0;
const profissional_service_1 = require("./profissional.service");
const profissional_dto_1 = require("./profissional.dto");
const service = new profissional_service_1.ProfissionalService();
class ProfissionalController {
    async criar(req, res) {
        const parsed = profissional_dto_1.ProfissionalCreateDTO.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(parsed.error.format());
        try {
            const profissional = await service.criar(parsed.data);
            return res.status(201).json(profissional);
        }
        catch (err) {
            return res.status(500).json({ message: "Erro ao criar profissional", detail: String(err?.message ?? err) });
        }
    }
    async listar(req, res) {
        const profissionais = await service.listar();
        return res.json(profissionais);
    }
}
exports.ProfissionalController = ProfissionalController;
//# sourceMappingURL=profissional.controller.js.map