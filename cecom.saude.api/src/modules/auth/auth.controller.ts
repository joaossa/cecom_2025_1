import { Request, Response } from "express";
import { z } from "zod";
import { LoginDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const parsed = LoginDTO.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    try {
      const result = await service.login(
        parsed.data.email,
        parsed.data.senha
      );
      return res.json(result);
    } catch {
      return res.status(401).json({ message: "Login inválido" });
    }
  }
}
