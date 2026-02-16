import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { MasterController } from "./master.controller";

const router = Router();
const controller = new MasterController();

router.use(authMiddleware);

router.get("/", (req, res) => controller.listar(req, res));
router.post("/", (req, res) => controller.criar(req, res));
router.put("/:id", (req, res) => controller.atualizar(req, res));
router.patch("/:id/inativar", (req, res) => controller.inativar(req, res));
router.delete("/:id", (req, res) => controller.excluir(req, res));

export default router;
