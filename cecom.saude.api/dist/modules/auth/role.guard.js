"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = roleGuard;
function roleGuard(rolesPermitidos) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        if (!rolesPermitidos.includes(user.role)) {
            return res.status(403).json({ message: "Acesso negado (role insuficiente)" });
        }
        return next();
    };
}
//# sourceMappingURL=role.guard.js.map