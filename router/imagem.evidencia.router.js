import express from "express";
import {
    getAllImagemEvidencia,
    getImagemEvidenciaById,
    createImagemEvidencia,
    updateImagemEvidencia,
    deleteImagemEvidencia
} from '../controllers/imagem.evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /evidencias/imagens:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Busca todas as imagens de evidência
 *     description: Retorna todas as imagens de evidência cadastradas
 *     responses:
 *       200:
 *         description: Retorna todas as imagens de evidência
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImagemEvidencia'
 *       404:
 *         description: Nenhuma imagem de evidência encontrada
 *       500:
 *         description: Erro ao buscar imagens de evidência
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Cria uma nova imagem de evidência
 *     description: Cria uma nova imagem de evidência com base no corpo da requisição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImagemEvidencia'
 *     responses:
 *       201:
 *         description: Imagem de evidência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagemEvidencia'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao criar imagem de evidência
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllImagemEvidencia)
    .post(authMiddleware("admin", "perito", "assistente"), createImagemEvidencia);


/**
 * @swagger
 * /evidencias/imagens/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Busca uma imagem de evidência por ID
 *     description: Retorna a imagem de evidência com o ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem de evidência
 *     responses:
 *       200:
 *         description: Imagem de evidência encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagemEvidencia'
 *       404:
 *         description: Imagem de evidência não encontrada
 *       500:
 *         description: Erro ao buscar imagem de evidência por ID
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Atualiza uma imagem de evidência
 *     description: Atualiza a imagem de evidência com o ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem de evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImagemEvidencia'
 *     responses:
 *       200:
 *         description: Imagem de evidência atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagemEvidencia'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao atualizar imagem de evidência
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - ImagemEvidencia
 *     summary: Exclui uma imagem de evidência
 *     description: Exclui a imagem de evidência com o ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem de evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evidencia:
 *                 type: string
 *                 description: ID da evidência
 *     responses:
 *       200:
 *         description: Imagem de evidência excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagem de evidência excluída com sucesso
 *       404:
 *         description: Imagem de evidência não encontrada
 *       500:
 *         description: Erro ao excluir imagem de evidência
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getImagemEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), updateImagemEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteImagemEvidencia);

export default router;
