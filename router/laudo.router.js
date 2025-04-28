import express from "express";
import {
    createLaudo,
    getAllLaudos,
    getLaudoById,
    updateLaudo,
    deleteLaudo,
    addCasoToLaudo,
} from '../controllers/laudo.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /laudos:
 *   get:
 *     summary: Retorna todos os laudos
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudos
 *     responses:
 *       200:
 *         description: Lista de laudos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laudo'
 *       500:
 *         description: Erro ao listar laudos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao listar laudos
 *   post:
 *     summary: Cria um novo laudo
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               peritoResponsavel:
 *                 type: string
 *               parecer:
 *                 type: object
 *                 properties:
 *                   caso:
 *                     type: string
 *                   evidencia:
 *                     type: string
 *                   paciente:
 *                     type: string
 *               detalhamento:
 *                 type: string
 *               conclusao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Laudo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Laudo criado com sucesso!
 *                 laudo:
 *                   $ref: '#/components/schemas/Laudo'
 *       500:
 *         description: Erro ao criar laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao criar laudo
 */
router.route('/')
    .get(authMiddleware("admin", "perito"), getAllLaudos)
    .post(authMiddleware("admin", "perito"), createLaudo);

/**
 * @swagger
 * /laudos/{id}:
 *   get:
 *     summary: Retorna um laudo por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do laudo
 *     responses:
 *       200:
 *         description: Laudo retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laudo'
 *       404:
 *         description: Laudo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Laudo não encontrado
 *       500:
 *         description: Erro ao obter laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao obter laudo
 *   put:
 *     summary: Atualiza um laudo por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do laudo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laudo'
 *     responses:
 *       200:
 *         description: Laudo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Laudo atualizado com sucesso!
 *                 laudo:
 *                   $ref: '#/components/schemas/Laudo'
 *       404:
 *         description: Laudo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Laudo não encontrado
 *       500:
 *         description: Erro ao atualizar laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao atualizar laudo
 *   delete:
 *     summary: Deleta um laudo por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do laudo
 *     responses:
 *       200:
 *         description: Laudo deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Laudo deletado com sucesso!
 *       404:
 *         description: Laudo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Laudo não encontrado
 *       500:
 *         description: Erro ao deletar laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao deletar laudo
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito"), getLaudoById)
    .put(authMiddleware("admin", "perito"), updateLaudo)
    .delete(authMiddleware("admin", "perito"), deleteLaudo);

/**
 * @swagger
 * /laudos/add-caso:
 *   patch:
 *     summary: Adiciona um caso a um laudo
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Laudos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idLaudo:
 *                 type: string
 *                 description: O ID do laudo
 *               idCaso:
 *                 type: string
 *                 description: O ID do caso a ser adicionado
 *     responses:
 *       200:
 *         description: Caso adicionado ao laudo com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso adicionado ao laudo com sucesso!
 *                 laudo:
 *                   type: object
 *                   $ref: '#/components/schemas/Laudo'
 *       400:
 *         description: idLaudo e idCaso são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: idLaudo e idCaso são obrigatórios
 *       404:
 *         description: Laudo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Laudo não encontrado
 *       500:
 *         description: Erro ao adicionar caso ao laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao adicionar caso ao laudo
 */
router.route('/add-caso')
    .patch(authMiddleware("admin", "perito"), addCasoToLaudo);


export default router;