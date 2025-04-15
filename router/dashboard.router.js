import express from "express";
import { getDashboardCaso, getDashboardEvidencia } from '../controllers/dashboard.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /dashboard/casos:
 *   get:
 *     summary: Retorna estatísticas dos casos
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Retorna as estatísticas dos casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeCasos:
 *                   type: integer
 *                   example: 10
 *                 quantidadeStatus:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                     example: 5
 *                 quantidadeCasosNoMes:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Nenhum caso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Nenhum caso encontrado
 *       500:
 *         description: Erro ao obter estatísticas dos casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 */
router.route('/casos')
    .get(authMiddleware("admin", "perito", "assistente"), getDashboardCaso);

/**
 * @swagger
 * /dashboard/evidencias:
 *   get:
 *     summary: Retorna estatísticas das evidências
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Retorna as estatísticas das evidências
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeEvidencias:
 *                   type: integer
 *                   example: 10
 *                 quantidadeStatus:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                     example: 5
 *                 quantidadeEvidenciasNoMes:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Nenhuma evidência encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Nenhuma evidência encontrada
 *       500:
 *         description: Erro ao obter estatísticas das evidências
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 */
router.route('/evidencias')
    .get(authMiddleware("admin", "perito", "assistente"), getDashboardEvidencia);

export default router;

