import { Request, Response } from "express";
import { PacienteService } from "./paciente.service";
import { PacienteCreateDTO } from "./paciente.dto";

const service = new PacienteService();

export class PacienteController {
  async criar(req: Request, res: Response) {
    const parsed = PacienteCreateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const paciente = await service.criar(parsed.data);
    return res.status(201).json(paciente);
  }

  async listar(req: Request, res: Response) {
    const pacientes = await service.listar();
    return res.json(pacientes);
  }
}
