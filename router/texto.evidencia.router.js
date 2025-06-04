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
 * /evidencias-textos:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Retorna todos os textos de evidência
 *     description: Retorna todos os textos de evidência
 *     responses:
 *       200:
 *         description: Textos de evidência retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TextoEvidencia'
 *       500:
 *         description: Erro ao buscar textos de evidência
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Cria um texto de evidência
 *     description: Cria um texto de evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do texto de evidência
 *               evidenciaId:
 *                 type: string
 *                 description: ID da evidência à qual o texto de evidência será adicionado
 *     responses:
 *       201:
 *         description: Texto de evidência criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 textoEvidencia:
 *                   $ref: '#/components/schemas/TextoEvidencia'
 *       500:
 *         description: Erro ao criar texto de evidência
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllTextosEvidencia)
    .post(authMiddleware("admin", "perito", "assistente"), createTextoEvidencia);

/**
 * @swagger
 * /evidencias-textos/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Retorna um texto de evidência pelo ID
 *     description: Retorna um texto de evidência pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto de evidência
 *     responses:
 *       200:
 *         description: Texto de evidência retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextoEvidencia'
 *       404:
 *         description: Texto de evidência não encontrado
 *       500:
 *         description: Erro ao buscar texto de evidência
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Atualiza um texto de evidência pelo ID
 *     description: Atualiza um texto de evidência pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto de evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do texto de evidência
 *     responses:
 *       200:
 *         description: Texto de evidência atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 textoEvidencia:
 *                   $ref: '#/components/schemas/TextoEvidencia'
 *       404:
 *         description: Texto de evidência não encontrado
 *       500:
 *         description: Erro ao atualizar texto de evidência
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TextoEvidencia
 *     summary: Deleta um texto de evidência pelo ID
 *     description: Deleta um texto de evidência pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto de evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evidenciaId:
 *                 type: string
 *                 description: ID da evidência à qual o texto de evidência será removido
 *     responses:
 *       200:
 *         description: Texto de evidência deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       404:
 *         description: Texto de evidência não encontrado
 *       500:
 *         description: Erro ao deletar texto de evidência
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getTextoEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), updateTextoEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteTextoEvidencia);

export default router;