import { Request, Response } from "express";
import { ProfissionalService } from "./profissional.service";
import { ProfissionalCreateDTO } from "./profissional.dto";

const service = new ProfissionalService();

export class ProfissionalController {
  async criar(req: Request, res: Response) {
    const parsed = ProfissionalCreateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const profissional = await service.criar(parsed.data);
    return res.status(201).json(profissional);
  }

  async listar(req: Request, res: Response) {
    const profissionais = await service.listar();
    return res.json(profissionais);
  }
}
