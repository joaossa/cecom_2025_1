import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Token ausente" });

  const [, token] = auth.split(" ");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
