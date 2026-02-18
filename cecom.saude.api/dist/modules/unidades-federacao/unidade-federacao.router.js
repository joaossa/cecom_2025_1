"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/auth.middleware");
const unidade_federacao_controller_1 = require("./unidade-federacao.controller");
const router = (0, express_1.Router)();
const controller = new unidade_federacao_controller_1.UnidadeFederacaoController();
router.use(auth_middleware_1.authMiddleware);
router.get("/", (req, res) => controller.listar(req, res));
router.post("/", (req, res) => controller.criar(req, res));
router.put("/:id", (req, res) => controller.atualizar(req, res));
router.delete("/:id", (req, res) => controller.excluir(req, res));
exports.default = router;
//# sourceMappingURL=unidade-federacao.router.js.map