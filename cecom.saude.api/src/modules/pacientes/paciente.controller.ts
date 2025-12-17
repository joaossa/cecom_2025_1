import { Request, Response } from "express";
import { PacienteService } from "./paciente.service";

const service = new PacienteService();

export class PacienteController {
  async criar(req: Request, res: Response) {
    const paciente = await service.criar(req.body);
    return res.status(201).json(paciente);
  }

  async listar(req: Request, res: Response) {
    const pacientes = await service.listar();
    return res.json(pacientes);
  }
}
