import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isAppJwtPayload } from "./auth.guard";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token malformado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!isAppJwtPayload(decoded)) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // ✅ Conversão EXPLÍCITA (correta)
    req.user = {
      id: Number(decoded.sub),
      role: decoded.role,
      cdMaster: decoded.cdMaster,
    };

    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
