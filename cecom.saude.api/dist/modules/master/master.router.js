"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/auth.middleware");
const master_controller_1 = require("./master.controller");
const router = (0, express_1.Router)();
const controller = new master_controller_1.MasterController();
router.use(auth_middleware_1.authMiddleware);
router.get("/", (req, res) => controller.listar(req, res));
router.post("/", (req, res) => controller.criar(req, res));
router.put("/:id", (req, res) => controller.atualizar(req, res));
router.patch("/:id/inativar", (req, res) => controller.inativar(req, res));
router.delete("/:id", (req, res) => controller.excluir(req, res));
exports.default = router;
//# sourceMappingURL=master.router.js.map