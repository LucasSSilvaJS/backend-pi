import express from "express";
import {
    createLaudo,
    getAllLaudos,
    getLaudoById,
    updateLaudo,
    deleteLaudo,
} from "../controllers/laudo.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /laudos:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudo
 *     summary: Obter todos os laudos
 *     description: Obter todos os laudos
 *     responses:
 *       200:
 *         description: Laudos obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laudo'
 *       500:
 *         description: Erro ao obter laudos
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudo
 *     summary: Criar um laudo
 *     description: Criar um laudo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - conclusao
 *               - peritoResponsavel
 *               - evidenciaId
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Descri o do laudo
 *               conclusao:
 *                 type: string
 *                 description: Conclus o do laudo
 *               peritoResponsavel:
 *                 type: string
 *                 description: ID do perito respons vel
 *               evidenciaId:
 *                 type: string
 *                 description: ID da evid ncia que o laudo pertence
 *     responses:
 *       201:
 *         description: Laudo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laudo'
 *       404:
 *         description: Evid ncia n o encontrada
 *       500:
 *         description: Erro ao criar laudo
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllLaudos)
    .post(authMiddleware("admin", "perito"), createLaudo);


/**
 * @swagger
 * /laudos/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudo
 *     summary: Obter laudo por ID
 *     description: Obter um laudo específico com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     responses:
 *       200:
 *         description: Laudo obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laudo'
 *       404:
 *         description: Laudo não encontrado
 *       500:
 *         description: Erro ao obter laudo
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudo
 *     summary: Atualizar um laudo
 *     description: Atualizar um laudo com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - conclusao
 *               - peritoResponsavel
 *             properties:
 *               descricao:
 *                 type: string
 *               conclusao:
 *                 type: string
 *               peritoResponsavel:
 *                 type: string
 *                 description: ID do perito responsável
 *     responses:
 *       200:
 *         description: Laudo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laudo'
 *       404:
 *         description: Laudo não encontrado
 *       500:
 *         description: Erro ao atualizar laudo
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudo
 *     summary: Deletar um laudo
 *     description: Deletar um laudo com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     responses:
 *       200:
 *         description: Laudo deletado com sucesso
 *       404:
 *         description: Laudo não encontrado
 *       500:
 *         description: Erro ao deletar laudo
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getLaudoById)
    .put(authMiddleware("admin", "perito"), updateLaudo)
    .delete(authMiddleware("admin", "perito"), deleteLaudo);

export default router;