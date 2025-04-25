import express from "express";
import {
    createEvidencia,
    getAllEvidencias,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidencia,
    addCasoToEvidencia
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
 *                   caso:
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
 *         multipart/form-data:
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
 *               caso:
 *                 type: string
 *               urlEvidencia:
 *                 type: array
 *                 items:
 *                   type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 *                     caso:
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
 *                 caso:
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
 *   delete:
 *     summary: Deleta uma evidência por ID
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
    .put(authMiddleware("admin", "perito", "assistente"), updateEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteEvidencia);

/**
 * @swagger
 * /evidencias/add-caso:
 *   patch:
 *     summary: Adiciona um caso a uma evidência
 *     security:
 *       - bearerAuth: []
 *     description: Adiciona um caso a uma evidência
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
 *                 example: 62e0a54f7f5a4a0e5e7ec7e5
 *               idCaso:
 *                 type: string
 *                 example: 62e0a54f7f5a4a0e5e7ec7e5
 *     responses:
 *       200:
 *         description: Caso adicionado à evidência com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso adicionado à evidência com sucesso!
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
 *                     caso:
 *                       type: string
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
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
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 */
router.route('/add-caso')
    .patch(authMiddleware("admin", "perito", "assistente"), addCasoToEvidencia);

export default router;
