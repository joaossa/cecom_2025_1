"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paciente_controller_1 = require("./paciente.controller");
const router = (0, express_1.Router)();
const controller = new paciente_controller_1.PacienteController();
router.post("/", (req, res) => controller.criar(req, res));
router.get("/", (req, res) => controller.listar(req, res));
exports.default = router;
//# sourceMappingURL=paciente.router.js.map