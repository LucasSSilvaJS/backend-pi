import express from "express";
import {
    getAllTextosEvidencia,
    getTextoEvidenciaById,
    createTextoEvidencia,
    updateTextoEvidencia,
    deleteTextoEvidencia
} from '../controllers/texto.evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /evidencias/{evidenciaId}/textos:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Retorna todos os textos de uma evidência
 *     description: Retorna todos os textos associados a uma evidência específica
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Textos da evidência retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TextoEvidencia'
 *       500:
 *         description: Erro ao buscar textos da evidência
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Cria um novo texto para uma evidência
 *     description: Cria um novo texto associado a uma evidência específica
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do texto
 *                 required: true
 *     responses:
 *       201:
 *         description: Texto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Texto de evidência criado com sucesso!
 *                 textoEvidencia:
 *                   $ref: '#/components/schemas/TextoEvidencia'
 *       500:
 *         description: Erro ao criar texto
 */
router.route('/evidencias/:evidenciaId/textos')
    .get(authMiddleware("admin", "perito", "assistente"), getAllTextosEvidencia)
    .post(authMiddleware("admin", "perito", "assistente"), createTextoEvidencia);

/**
 * @swagger
 * /evidencias/{evidenciaId}/textos/{textoId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Retorna um texto específico de uma evidência
 *     description: Retorna um texto específico associado a uma evidência
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: path
 *         name: textoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto
 *     responses:
 *       200:
 *         description: Texto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextoEvidencia'
 *       404:
 *         description: Texto não encontrado
 *       500:
 *         description: Erro ao buscar texto
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Atualiza um texto específico de uma evidência
 *     description: Atualiza o conteúdo de um texto específico de uma evidência
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: path
 *         name: textoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Novo conteúdo do texto
 *                 required: true
 *     responses:
 *       200:
 *         description: Texto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Texto de evidência atualizado com sucesso!
 *                 textoEvidencia:
 *                   $ref: '#/components/schemas/TextoEvidencia'
 *       404:
 *         description: Texto não encontrado
 *       500:
 *         description: Erro ao atualizar texto
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Remove um texto específico de uma evidência
 *     description: Remove um texto específico de uma evidência
 *     parameters:
 *       - in: path
 *         name: evidenciaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: path
 *         name: textoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto
 *     responses:
 *       200:
 *         description: Texto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Texto de evidência deletado com sucesso!
 *       404:
 *         description: Texto não encontrado
 *       500:
 *         description: Erro ao remover texto
 */
router.route('/evidencias/:evidenciaId/textos/:textoId')
    .get(authMiddleware("admin", "perito", "assistente"), getTextoEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), updateTextoEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteTextoEvidencia);

export default router;