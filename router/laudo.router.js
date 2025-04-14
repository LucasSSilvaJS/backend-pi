import express from "express";
import {
    createLaudo,
    getAllLaudos,
    getLaudoById,
    updateLaudo,
    deleteLaudo,
    addPeritoToLaudo,
    addEvidenciaToLaudo,
    addCasoToLaudo,
    addPacienteToLaudo
} from '../controllers/laudo.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /laudos:
 *   get:
 *     summary: Retorna todos os laudos
 *     security:
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 * /laudos/add-perito:
 *   patch:
 *     summary: Adiciona um perito a um laudo
 *     security:
 *       - BearerAuth: []
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
 *               idPerito:
 *                 type: string
 *                 description: O ID do perito a ser adicionado
 *     responses:
 *       200:
 *         description: Perito adicionado ao laudo com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Perito adicionado ao laudo com sucesso!
 *                 laudo:
 *                   type: object
 *                   $ref: '#/components/schemas/Laudo'
 *       400:
 *         description: idLaudo e idPerito são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: idLaudo e idPerito são obrigatórios
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
 *         description: Erro ao adicionar perito ao laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao adicionar perito ao laudo
 */
router.route('/add-perito')
    .patch(authMiddleware("admin", "perito"), addPeritoToLaudo);

/**
 * @swagger
 * /laudos/add-evidencia:
 *   patch:
 *     summary: Adiciona uma evidência a um laudo
 *     security:
 *       - BearerAuth: []
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
 *               idEvidencia:
 *                 type: string
 *                 description: O ID da evidência a ser adicionada
 *     responses:
 *       200:
 *         description: Evidência adicionada ao laudo com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evidência adicionada ao laudo com sucesso!
 *                 laudo:
 *                   type: object
 *                   $ref: '#/components/schemas/Laudo'
 *       400:
 *         description: idLaudo e idEvidencia são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: idLaudo e idEvidencia são obrigatórios
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
 *         description: Erro ao adicionar evidência ao laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao adicionar evidência ao laudo
 */
router.route('/add-evidencia')
    .patch(authMiddleware("admin", "perito"), addEvidenciaToLaudo);

/**
 * @swagger
 * /laudos/add-caso:
 *   patch:
 *     summary: Adiciona um caso a um laudo
 *     security:
 *       - BearerAuth: []
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

/**
 * @swagger
 * /laudos/add-paciente:
 *   patch:
 *     summary: Adiciona um paciente a um laudo
 *     security:
 *       - BearerAuth: []
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
 *               idPaciente:
 *                 type: string
 *                 description: O ID do paciente a ser adicionado
 *     responses:
 *       200:
 *         description: Paciente adicionado ao laudo com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente adicionado ao laudo com sucesso!
 *                 laudo:
 *                   type: object
 *                   $ref: '#/components/schemas/Laudo'
 *       400:
 *         description: idLaudo e idPaciente são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: idLaudo e idPaciente são obrigatórios
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
 *         description: Erro ao adicionar paciente ao laudo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao adicionar paciente ao laudo
 */
router.route('/add-paciente')
    .patch(authMiddleware("admin", "perito"), addPacienteToLaudo);

export default router;