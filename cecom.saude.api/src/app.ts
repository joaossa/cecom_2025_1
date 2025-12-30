import express from "express";
import pacienteRouter from "./modules/pacientes/paciente.router";
import profissionalRouter from "./modules/profissionais/profissional.router";
// import atendimentoRouter from "./modules/atendimentos/atendimento.router";
// import sinaisRouter from "./modules/sinais/sinais.router";
// import escalasRouter from "./modules/escalas/glasgow.router";

// import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

// ROTAS PRINCIPAIS
app.use("/pacientes", pacienteRouter);
app.use("/profissionais", profissionalRouter);
// app.use("/atendimentos", atendimentoRouter);
// app.use("/sinais", sinaisRouter);
// app.use("/escalas", escalasRouter);

// // middleware de erro
// app.use(errorHandler);

export default app;
