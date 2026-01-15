import { Router } from "express";
import { ProfissionalController } from "./profissional.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { roleGuard } from "../auth/role.guard";

const router = Router();
const controller = new ProfissionalController();

// Deve ser a primeira: authMiddleware
// router.get("/", authMiddleware, controller.listar);
router.get(
  "/",
  authMiddleware,
  roleGuard(["ADMIN"]),
  controller.listar
);
router.post("/", controller.criar.bind(controller));
router.get("/", controller.listar.bind(controller));

export default router;
