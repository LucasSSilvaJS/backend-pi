import express from "express";
import {
    getAllImagemEvidencia,
    getImagemEvidenciaById,
    createImagemEvidencia,
    updateImagemEvidencia,
    deleteImagemEvidencia
} from '../controllers/imagem.evidencia.controller.js';

import { upload } from "../middlewares/upload.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /evidencias/{evidenciaId}/imagens:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Busca todas as imagens de uma evidência
 *     description: Retorna todas as imagens associadas a uma evidência específica
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Retorna todas as imagens da evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImagemEvidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao buscar imagens da evidência
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Cria uma nova imagem para uma evidência
 *     description: Cria uma nova imagem associada a uma evidência específica
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagem a ser cadastrada
 *     responses:
 *       201:
 *         description: Imagem de evidência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagemEvidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao criar imagem de evidência
 */
router.route('/evidencias/:evidenciaId/imagens')
    .get(authMiddleware("admin", "perito", "assistente"), getAllImagemEvidencia)
    .post(authMiddleware("admin", "perito", "assistente"), upload.single('file'), createImagemEvidencia);

/**
 * @swagger
 * /evidencias/{evidenciaId}/imagens/{imagemId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Busca uma imagem específica de uma evidência
 *     description: Retorna uma imagem específica de uma evidência
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: path
 *         name: imagemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem
 *     responses:
 *       200:
 *         description: Imagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagemEvidencia'
 *       404:
 *         description: Imagem ou evidência não encontrada
 *       500:
 *         description: Erro ao buscar imagem
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Atualiza uma imagem de evidência
 *     description: Atualiza uma imagem específica de uma evidência
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: path
 *         name: imagemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Nova imagem
 *     responses:
 *       200:
 *         description: Imagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagemEvidencia'
 *       404:
 *         description: Imagem ou evidência não encontrada
 *       500:
 *         description: Erro ao atualizar imagem
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Remove uma imagem de evidência
 *     description: Remove uma imagem específica de uma evidência
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: path
 *         name: imagemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem
 *     responses:
 *       200:
 *         description: Imagem removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagem removida com sucesso
 *       404:
 *         description: Imagem ou evidência não encontrada
 *       500:
 *         description: Erro ao remover imagem
 */
router.route('/evidencias/:evidenciaId/imagens/:imagemId')
    .get(authMiddleware("admin", "perito", "assistente"), getImagemEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), upload.single('file'), updateImagemEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteImagemEvidencia);

export default router;
