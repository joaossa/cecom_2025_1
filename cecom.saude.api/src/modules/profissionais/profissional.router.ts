import { Router } from "express";
import { ProfissionalController } from "./profissional.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const controller = new ProfissionalController();

// router.post("/", (req, res) => controller.criar(req, res));
// router.get("/", (req, res) => controller.listar(req, res));
router.get("/", authMiddleware, controller.listar);
router.post("/", controller.criar.bind(controller));
router.get("/", controller.listar.bind(controller));

export default router;
