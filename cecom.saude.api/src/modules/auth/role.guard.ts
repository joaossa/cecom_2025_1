import { Request, Response, NextFunction } from "express";

export function roleGuard(rolesPermitidos: Array<"ADMIN" | "PROFISSIONAL" | "LEITURA">) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    if (!rolesPermitidos.includes(user.role as any)) {
      return res.status(403).json({ message: "Acesso negado (role insuficiente)" });
    }

    return next();
  };
}
