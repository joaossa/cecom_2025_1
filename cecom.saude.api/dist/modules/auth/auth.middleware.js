"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_guard_1 = require("./auth.guard");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token não informado" });
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Token malformado" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!(0, auth_guard_1.isAppJwtPayload)(decoded)) {
            return res.status(401).json({ message: "Token inválido" });
        }
        // ✅ Conversão EXPLÍCITA (correta)
        req.user = {
            id: Number(decoded.sub),
            role: decoded.role,
            cdMaster: decoded.cdMaster,
        };
        return next();
    }
    catch {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
}
//# sourceMappingURL=auth.middleware.js.map