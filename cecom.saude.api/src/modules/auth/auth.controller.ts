import { Request, Response } from "express";
import { z } from "zod";
import { LoginDTO, RecoveryRequestDTO, RegisterDTO } from "./auth.dto";
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
        parsed.data.cdMaster,
        parsed.data.email,
        parsed.data.senha
      );

      
      return res.json(result);
    } catch (err: any) {
      console.error("Erro no login:", err?.message ?? err, err?.stack);
      return res.status(401).json({ message: err?.message ?? "Login inválido" });
    }
  }

  async register(req: Request, res: Response) {
    const parsed = RegisterDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    try {
      const result = await service.register(
        parsed.data.cdMaster,
        parsed.data.email,
        parsed.data.senha
      );

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Não foi possível criar conta",
      });
    }
  }

  async requestPasswordRecovery(req: Request, res: Response) {
    const parsed = RecoveryRequestDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    const result = await service.requestPasswordRecovery(
      parsed.data.cdMaster,
      parsed.data.email
    );

    return res.status(202).json(result);
  }

  
  async me(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    return res.json({
      id: req.user.id,
      role: req.user.role,
      cdMaster: req.user.cdMaster,
    });
  }  
}
