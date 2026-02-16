"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profissional_controller_1 = require("./profissional.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const role_guard_1 = require("../auth/role.guard");
const router = (0, express_1.Router)();
const controller = new profissional_controller_1.ProfissionalController();
// Deve ser a primeira: authMiddleware
// router.get("/", authMiddleware, controller.listar);
router.get("/", auth_middleware_1.authMiddleware, (0, role_guard_1.roleGuard)(["ADMIN"]), controller.listar);
router.post("/", controller.criar.bind(controller));
router.get("/", controller.listar.bind(controller));
exports.default = router;
//# sourceMappingURL=profissional.router.js.map