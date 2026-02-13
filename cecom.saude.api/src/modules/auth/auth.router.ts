import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = Router();
const controller = new AuthController();

router.post("/login", (req, res) => controller.login(req, res));
router.post("/register", (req, res) => controller.register(req, res));
router.post("/recovery/request", (req, res) =>
  controller.requestPasswordRecovery(req, res)
);

router.get("/me", authMiddleware, (req, res) => controller.me(req, res));

export default router;
