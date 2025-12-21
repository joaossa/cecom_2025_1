import { Router } from "express";
import { PacienteController } from "./paciente.controller";

const router = Router();
const controller = new PacienteController();

router.post("/", (req, res) => controller.criar(req, res));
router.get("/", (req, res) => controller.listar(req, res));

export default router;
