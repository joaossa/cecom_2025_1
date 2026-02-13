import { Request, Response } from "express";
import { z } from "zod";
import { LoginDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    console.log("JWT_SECRET definido?", !!process.env.JWT_SECRET, "len=", process.env.JWT_SECRET?.length);
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
    } catch (err: any) {
      console.error("Erro no login:", err?.message ?? err, err?.stack);
      return res.status(401).json({ message: err?.message ?? "Login inválido" });
    }
  }

  // 🧩 ENDPOINT ME
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
