import express from "express";
import { getQuantidadeCasos, getQuantidadeEvidencias, getQuantidadeVitimas, getQuantidadeVitimasPorGeneroDeUmCaso, getQuantidadeVitimasPorEtniaDeUmCaso, getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get all statistics
 *     description: Get all statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of all statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeCasos:
 *                   type: integer
 *                   description: The quantity of cases
 *                 quantidadeEvidencias:
 *                   type: integer
 *                   description: The quantity of evidence
 *                 quantidadeVitimas:
 *                   type: integer
 *                   description: The quantity of victims
 *                 quantidadeVitimasPorGenero:
 *                   type: object
 *                   properties:
 *                     quantidadeVitimasMasculinas:
 *                       type: integer
 *                       description: The quantity of male victims
 *                     quantidadeVitimasFemininas:
 *                       type: integer
 *                       description: The quantity of female victims
 *                 quantidadeVitimasPorEtnia:
 *                   type: object
 *                   properties:
 *                     quantidadeVitimasPretas:
 *                       type: integer
 *                       description: The quantity of black victims
 *                     quantidadeVitimasPardas:
 *                       type: integer
 *                       description: The quantity of brown victims
 *                     quantidadeVitimasIndigenas:
 *                       type: integer
 *                       description: The quantity of indigenous victims
 *                     quantidadeVitimasAmarelas:
 *                       type: integer
 *                       description: The quantity of yellow victims
 *                 quantidadeVitimasPorIntervaloDeIdade:
 *                   type: object
 *                   properties:
 *                     quantidadeVitimas:
 *                       type: integer
 *                       description: The quantity of victims in the age range
 *       500:
 *         description: Error getting statistics
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeCasos)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeEvidencias)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimas)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorGeneroDeUmCaso)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorEtniaDeUmCaso)
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso);

export default router;

