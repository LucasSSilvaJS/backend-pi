import express from "express";
import { limparBanco } from '../controllers/admin.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /admin/limpar-banco:
 *   delete:
 *     summary: Limpa todo o banco de dados (exceto usuários)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Administração
 *     description: Remove todos os dados do banco exceto usuários
 *     responses:
 *       200:
 *         description: Banco de dados limpo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banco de dados limpo com sucesso!
 *                 detalhes:
 *                   type: object
 *                   properties:
 *                     evidencias:
 *                       type: string
 *                       example: Todas as evidências foram removidas
 *                     casos:
 *                       type: string
 *                       example: Todos os casos foram removidos
 *                     laudos:
 *                       type: string
 *                       example: Todos os laudos foram removidos
 *                     pacientes:
 *                       type: string
 *                       example: Todos os pacientes foram removidos
 *       500:
 *         description: Erro ao limpar banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao limpar banco de dados
 *                 detalhes:
 *                   type: string
 *                   example: Mensagem de erro detalhada
 */
router.delete('/limpar-banco', authMiddleware("admin"), limparBanco);

export default router; 