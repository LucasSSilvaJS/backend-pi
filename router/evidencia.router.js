import express from "express";
import {
    createEvidencia,
    getAllEvidencias,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidencia,
    addImagemToEvidencia,
    removeImagemFromEvidencia,
    addTextoToEvidencia,
    removeTextoFromEvidencia,
    addLaudoToEvidencia,
    removeLaudoFromEvidencia
} from '../controllers/evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.js";


const router = express.Router();

/**
 * @swagger
 * /evidencias:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Retorna todas as evidências
 *     description: Retorna todas as evidências
 *     responses:
 *       200:
 *         description: Evidências retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evidencia'
 *       500:
 *         description: Erro ao buscar evidências
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Cria uma nova evidência
 *     description: Cria uma nova evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "FOTO"
 *               dataColeta:
 *                 type: date
 *                 example: "2022-01-01T00:00:00.000Z"
 *               status:
 *                 type: string
 *                 example: "EM_ANALISE"
 *               coletadaPor:
 *                 type: string
 *                 example: "5f9f1c5b9c9d4400007b43c0"
 *               latitude:
 *                 type: number
 *                 example: -23.555555
 *               longitude:
 *                 type: number
 *                 example: -46.645645
 *               casoId:
 *                 type: string
 *                 example: "5f9f1c5b9c9d4400007b43c1"
 *     responses:
 *       201:
 *         description: Evidência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       500:
 *         description: Erro ao criar evidência
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllEvidencias)
    .post(authMiddleware("admin", "perito"), upload.single('file'), createEvidencia);

/**
 * @swagger
 * /evidencias/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Retorna uma evidência pelo ID
 *     description: Retorna uma evidência específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Evidência retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao buscar evidência
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Atualiza uma evidência pelo ID
 *     description: Atualiza uma evidência específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evidencia'
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao atualizar evidência
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Deleta uma evidência pelo ID
 *     description: Deleta uma evidência específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Evidência deletada com sucesso
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao deletar evidência
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getEvidenciaById)
    .put(authMiddleware("admin", "perito"), updateEvidencia)
    .delete(authMiddleware("admin", "perito"), deleteEvidencia);

/**
 * @swagger
 * /evidencias/{id}/imagens:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Adiciona uma imagem à evidência
 *     description: Adiciona uma imagem à evidência com base no ID fornecido
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: formData
 *         name: file
 *         required: true
 *         schema:
 *           type: file
 *         description: Imagem a ser adicionada
 *     responses:
 *       200:
 *         description: Imagem adicionada à evidência com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao adicionar imagem à evidência
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Remove uma imagem da evidência
 *     description: Remove uma imagem da evidência com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: query
 *         name: idImagem
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem a ser removida
 *     responses:
 *       200:
 *         description: Imagem removida da evidência com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao remover imagem da evidência
 */
router.route('/:id/imagens')
    .post(authMiddleware("admin", "perito", "assistente"), upload.single('file'), addImagemToEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), removeImagemFromEvidencia);

/**
 * @swagger
 * /evidencias/{id}/textos:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Adiciona um texto à evidência
 *     description: Adiciona um texto à evidência com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: query
 *         name: idTexto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto a ser adicionado
 *     responses:
 *       200:
 *         description: Texto adicionado à evidência com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao adicionar texto à evidência
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Remove um texto da evidência
 *     description: Remove um texto da evidência com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: query
 *         name: idTexto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto a ser removido
 *     responses:
 *       200:
 *         description: Texto removido da evidência com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao remover texto da evidência
 */
router.route('/:id/textos')
    .post(authMiddleware("admin", "perito", "assistente"), addTextoToEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), removeTextoFromEvidencia);

/**
 * @swagger
 * /evidencias/{id}/laudos:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Adiciona um laudo à evidência
 *     description: Adiciona um laudo à evidência com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *       - in: query
 *         name: idLaudo
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo a ser adicionado
 *     responses:
 *       200:
 *         description: Laudo adicionado à evidência com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao adicionar laudo à evidência
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Evidencia
 *     summary: Remove um laudo da evidência
 *     description: Remove um laudo da evidência com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Laudo removido da evidência com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao remover laudo da evidência
 */
router.route('/:id/laudos')
    .post(authMiddleware("admin", "perito", "assistente"), addLaudoToEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), removeLaudoFromEvidencia);

export default router;
