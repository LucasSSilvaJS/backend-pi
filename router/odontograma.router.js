import express from "express";

import {
    createOdontograma,
    getAllOdontogramas,
    getOdontogramaById,
    updateOdontogramaById,
    deleteOdontogramaById
} from '../controllers/odontograma.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /odontogramas:
 *   get:
 *     summary: Retorna todos os odontogramas
 *     tags:
 *       - Odontograma 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna todos os odontogramas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Odontograma'
 *       500:
 *         description: Erro ao buscar odontogramas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Cria um novo odontograma
 *     tags:
 *       - Odontograma
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificacao
 *               - observacao
 *               - idVitima
 *             properties:
 *               identificacao:
 *                 type: number
 *               observacao:
 *                 type: string
 *               idVitima:
 *                 type: string
 *     responses:
 *       201:
 *         description: Odontograma criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Odontograma'
 *       500:
 *         description: Erro ao criar odontograma
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllOdontogramas)
    .post(authMiddleware("admin", "perito"), createOdontograma);

/**
 * @openapi
 * /odontograma/{id}:
 *   get:
 *     tags:
 *       - Odontograma
 *     summary: Busca um odontograma pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Odontograma encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Odontograma'
 *       404:
 *         description: Odontograma nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro ao buscar odontograma
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Atualiza um odontograma
 *     tags:
 *       - Odontograma
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificacao
 *               - observacao
 *             properties:
 *               identificacao:
 *                 type: number
 *               observacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Odontograma atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Odontograma'
 *       404:
 *         description: Odontograma nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro ao atualizar odontograma
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Deleta um odontograma
 *     tags:
 *       - Odontograma
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idVitima
 *             properties:
 *               idVitima:
 *                 type: string
 *     responses:
 *       200:
 *         description: Odontograma deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Odontograma nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro ao deletar odontograma
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getOdontogramaById)
    .put(authMiddleware("admin", "perito"), updateOdontogramaById)
    .delete(authMiddleware("admin", "perito"), deleteOdontogramaById);

export default router;
