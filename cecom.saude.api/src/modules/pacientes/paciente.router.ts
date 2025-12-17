import { Router } from "express";
import { PacienteController } from "./paciente.controllers";

const router = Router();
const controller = new PacienteController();

router.post("/", controller.criar);
router.get("/", controller.listar);

export default router;
