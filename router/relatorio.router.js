import {
    createRelatorio,
    getAllRelatorios,
    getRelatorioById,
    updateRelatorio,
    deleteRelatorio
} from '../controllers/relatorio.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import express from "express";

const router = express.Router();

/**
 * @swagger
 * /relatorios:
 *   post:
 *     summary: Create a new relatorio
 *     description: Create a new relatorio with title, content, and responsible expert.
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: The title of the relatorio
 *               conteudo:
 *                 type: string
 *                 description: The content of the relatorio
 *               peritoResponsavel:
 *                 type: string
 *                 description: The ID of the responsible expert
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               casoId:
 *                 type: string
 *                 description: The ID of the caso
 *     responses:
 *       201:
 *         description: Relatorio created successfully
 *       500:
 *         description: Error creating relatorio
 *   get:
 *     summary: Get all relatorios
 *     description: Retrieve a list of all relatorios
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of relatorios
 *       500:
 *         description: Error fetching relatorios
 */
router.route('/')
    .post(authMiddleware("admin", "perito"), createRelatorio)
    .get(authMiddleware("admin", "perito", "assistente"), getAllRelatorios);

/**
 * @swagger
 * /relatorios/{id}:
 *   get:
 *     summary: Obter um relatório por ID
 *     description: Retorna um relatório específico com base no ID fornecido
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do relatório
 *     responses:
 *       200:
 *         description: Relatório encontrado com sucesso
 *       404:
 *         description: Relatório não encontrado
 *       500:
 *         description: Erro ao buscar relatório
 *   put:
 *     summary: Atualizar um relatório
 *     description: Atualiza um relatório com título, conteúdo e perito responsável
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do relatório
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do relatório
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do relatório
 *               peritoResponsavel:
 *                 type: string
 *                 description: ID do perito responsável
 *     responses:
 *       200:
 *         description: Relatório atualizado com sucesso
 *       404:
 *         description: Relatório não encontrado
 *       500:
 *         description: Erro ao atualizar relatório
 *   delete:
 *     summary: Excluir um relatório
 *     description: Exclui um relatório existente
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do relatório
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               casoId:
 *                 type: string
 *                 description: ID do caso
 *     responses:
 *       200:
 *         description: Relatório excluído com sucesso
 *       404:
 *         description: Relatório não encontrado
 *       500:
 *         description: Erro ao excluir relatório
 */
router.route("/:id")
    .get(authMiddleware("admin", "perito", "assistente"), getRelatorioById)
    .put(authMiddleware("admin", "perito"), updateRelatorio)
    .delete(authMiddleware("admin", "perito"), deleteRelatorio);

export default router;
