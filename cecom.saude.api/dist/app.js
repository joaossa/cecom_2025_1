"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const paciente_router_1 = __importDefault(require("./modules/pacientes/paciente.router"));
const profissional_router_1 = __importDefault(require("./modules/profissionais/profissional.router"));
const master_router_1 = __importDefault(require("./modules/master/master.router"));
const pais_router_1 = __importDefault(require("./modules/paises/pais.router"));
const cidade_router_1 = __importDefault(require("./modules/cidades/cidade.router"));
const unidade_federacao_router_1 = __importDefault(require("./modules/unidades-federacao/unidade-federacao.router"));
const auth_middleware_1 = require("./modules/auth/auth.middleware");
// import atendimentoRouter from "./modules/atendimentos/atendimento.router";
// import sinaisRouter from "./modules/sinais/sinais.router";
// import escalasRouter from "./modules/escalas/glasgow.router";
// import errorHandler from "./middlewares/errorHandler";
const app = (0, express_1.default)();
const corsOriginsEnv = process.env.CORS_ORIGINS || "";
const allowedOrigins = corsOriginsEnv
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // allow non-browser requests and local tools (curl, postman, health checks)
        if (!origin) {
            return callback(null, true);
        }
        // if no explicit whitelist is set, keep permissive behavior for local development
        if (allowedOrigins.length === 0) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json());
// ROTAS PRINCIPAIS
app.use("/auth", auth_router_1.default);
app.use("/pacientes", paciente_router_1.default);
app.use("/profissionais", profissional_router_1.default);
app.use("/masters", master_router_1.default);
app.use("/paises", pais_router_1.default);
app.use("/cidades", cidade_router_1.default);
app.use("/unidades-federacao", unidade_federacao_router_1.default);
// app.use("/atendimentos", atendimentoRouter);
// app.use("/sinais", sinaisRouter);
// app.use("/escalas", escalasRouter);
// // middleware de erro
// app.use(errorHandler);
// healthcheck
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.get("/protected", auth_middleware_1.authMiddleware, (req, res) => {
    return res.json({
        message: "Acesso autorizado",
        user: req.user,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map