import express from "express";
import { getQuantidadeCasos, getQuantidadeEvidencias, getQuantidadeVitimas, getQuantidadeVitimasPorGeneroDeUmCaso, getQuantidadeVitimasPorEtniaDeUmCaso, getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeCasos)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeEvidencias)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimas)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorGeneroDeUmCaso)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorEtniaDeUmCaso)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso);

export default router;

