import { Router } from "express";
import { ProfissionalController } from "./profissional.controller";

const router = Router();
const controller = new ProfissionalController();

// router.post("/", (req, res) => controller.criar(req, res));
// router.get("/", (req, res) => controller.listar(req, res));

router.post("/", controller.criar.bind(controller));
router.get("/", controller.listar.bind(controller));

export default router;
