import express from "express";
import {
    createEvidencia,
    getAllEvidencias,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidencia,
    addLaudoToEvidencia
} from '../controllers/evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * /evidencias:
 *   get:
 *     summary: Retorna todas as evidências
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidências
 *     responses:
 *       200:
 *         description: Lista de todas as evidências
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   dataColeta:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   coletadaPor:
 *                     type: string
 *                   urlEvidencia:
 *                     type: string
 *                   laudo:
 *                     type: string
 *       500:
 *         description: Erro ao buscar evidências
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao buscar evidências
 *   post:
 *     summary: Cria uma nova evidência
 *     tags:
 *       - Evidências
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               dataColeta:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               coletadaPor:
 *                 type: string
 *               laudo:
 *                 type: string
 *               urlEvidencia:
 *                 type: array
 *                 items:
 *                   type: string
 *       responses:
 *         201:
 *           description: Evidência criada com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   evidencia:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       tipo:
 *                         type: string
 *                       dataColeta:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       coletadaPor:
 *                         type: string
 *                       urlEvidencia:
 *                         type: array
 *                         items:
 *                           type: string
 *     responses:
 *       201:
 *         description: Evidência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evidência criada com sucesso!
 *                 evidencia:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     dataColeta:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                     coletadaPor:
 *                       type: string
 *                     urlEvidencia:
 *                       type: array
 *                       items:
 *                         type: string
 *                     laudo:
 *                       type: string
 *       500:
 *         description: Erro ao criar evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao criar evidência
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllEvidencias)
    .post(authMiddleware("admin", "perito", "assistente"), upload.array('files', 10), createEvidencia);

/**
 * @swagger
 * /evidencias/{id}:
 *   get:
 *     summary: Busca uma evidência por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidências
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O id da evidência
 *     responses:
 *       200:
 *         description: Evidência encontrada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 dataColeta:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                 coletadaPor:
 *                   type: string
 *                 urlEvidencia:
 *                   type: array
 *                   items:
 *                     type: string
 *                 laudo:
 *                   type: string
 *       404:
 *         description: Evidência não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Evidência não encontrada
 *       500:
 *         description: Erro ao buscar evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao buscar evidência
 *   put:
 *     summary: Atualiza uma evidência
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidências
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O id da evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               dataColeta:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               coletadaPor:
 *                 type: string
 *               urlEvidencia:
 *                 type: array
 *                 items:
 *                   type: string
 *               laudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evidência atualizada com sucesso!
 *                 evidencia:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     dataColeta:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                     coletadaPor:
 *                       type: string
 *                     urlEvidencia:
 *                       type: array
 *                       items:
 *                         type: string
 *                     laudo:
 *                       type: string
 *       404:
 *         description: Evidência não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Evidência não encontrada
 *       500:
 *         description: Erro ao atualizar evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao atualizar evidência
 *   delete:
 *     summary: Deleta uma evidência
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidências
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O id da evidência
 *     responses:
 *       200:
 *         description: Evidência deletada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evidência deletada com sucesso!
 *       404:
 *         description: Evidência não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Evidência não encontrada
 *       500:
 *         description: Erro ao deletar evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao deletar evidência
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), upload.array('files', 10), updateEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteEvidencia);

/**
 * @swagger
 * /evidencias/add-laudo:
 *   patch:
 *     summary: Adiciona um laudo a uma evidência
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidências
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEvidencia:
 *                 type: string
 *                 description: O id da evidência
 *               idLaudo:
 *                 type: string
 *                 description: O id do laudo a ser adicionado
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evidência atualizada com sucesso!
 *                 evidencia:
 *                   type: object
 *                   $ref: '#/components/schemas/Evidencia'
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
 *         description: Evidência não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Evidência não encontrada
 *       500:
 *         description: Erro ao preencher laudoId da evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao preencher laudoId da evidência
 */
router.route('/add-laudo')
    .patch(authMiddleware("admin", "perito", "assistente"), addLaudoToEvidencia);

export default router;
