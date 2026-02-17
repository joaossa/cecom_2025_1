import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.router";
import pacienteRouter from "./modules/pacientes/paciente.router";
import profissionalRouter from "./modules/profissionais/profissional.router";
import masterRouter from "./modules/master/master.router";
import { authMiddleware } from "./modules/auth/auth.middleware";
// import atendimentoRouter from "./modules/atendimentos/atendimento.router";
// import sinaisRouter from "./modules/sinais/sinais.router";
// import escalasRouter from "./modules/escalas/glasgow.router";

// import errorHandler from "./middlewares/errorHandler";

const app = express();

const corsOriginsEnv = process.env.CORS_ORIGINS || "";
const allowedOrigins = corsOriginsEnv
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
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
  })
);
app.use(express.json());

// ROTAS PRINCIPAIS
app.use("/auth", authRouter);
app.use("/pacientes", pacienteRouter);
app.use("/profissionais", profissionalRouter);
app.use("/masters", masterRouter);
// app.use("/atendimentos", atendimentoRouter);
// app.use("/sinais", sinaisRouter);
// app.use("/escalas", escalasRouter);

// // middleware de erro
// app.use(errorHandler);

// healthcheck
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/protected", authMiddleware, (req, res) => {
  return res.json({
    message: "Acesso autorizado",
    user: req.user,
  });
});

export default app;
