"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteController = void 0;
const paciente_service_1 = require("./paciente.service");
const paciente_dto_1 = require("./paciente.dto");
const service = new paciente_service_1.PacienteService();
class PacienteController {
    async criar(req, res) {
        const parsed = paciente_dto_1.PacienteCreateDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.format());
        }
        const paciente = await service.criar(parsed.data);
        return res.status(201).json(paciente);
    }
    async listar(req, res) {
        const pacientes = await service.listar();
        return res.json(pacientes);
    }
}
exports.PacienteController = PacienteController;
//# sourceMappingURL=paciente.controller.js.map