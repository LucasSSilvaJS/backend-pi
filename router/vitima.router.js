import express from "express";
import {
  getAllVitimas,
  getVitimaById,
  createVitima,
  updateVitima,
  deleteVitima,
  addOdontogramaToVitima,
  removeOdontogramaFromVitima,
} from "../controllers/vitima.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /vitimas:
 *   get:
 *     summary: Obter todas as vítimas
 *     description: Retorna todas as vítimas cadastradas
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vítimas encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vitima'
 *       500:
 *         description: Erro ao buscar vítimas
 *   post:
 *     summary: Criar uma vítima
 *     description: Cria uma nova vítima
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vitima'
 *     responses:
 *       201:
 *         description: Vítima criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao criar vítima
 */
router.route("/")
    .get(authMiddleware("admin", "perito", "assistente"), getAllVitimas)
    .post(authMiddleware("admin", "perito"), createVitima);

/**
 * @swagger
 * /vitimas/{id}:
 *   get:
 *     summary: Get a Vitima by ID
 *     description: Get a Vitima by ID
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the vitima to get
 *     responses:
 *       200:
 *         description: Vitima found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       404:
 *         description: Vitima nao encontrada
 *       500:
 *         description: Error finding Vitima
 *   put:
 *     summary: Update a Vitima
 *     description: Update a Vitima
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the vitima to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vitima'
 *     responses:
 *       200:
 *         description: Vitima updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error updating Vitima
 *   delete:
 *     summary: Delete a Vitima
 *     description: Delete a Vitima
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the vitima to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCaso:
 *                 type: string
 *                 description: The ID of the caso to remove the vitima from
 *     responses:
 *       200:
 *         description: Vitima deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *       404:
 *         description: Vitima nao encontrada
 *       500:
 *         description: Error deleting Vitima
 */
router.route("/:id")
    .get(authMiddleware("admin", "perito", "assistente"), getVitimaById)
    .put(authMiddleware("admin", "perito"), updateVitima)
    .delete(authMiddleware("admin", "perito"), deleteVitima);

/**
 * @swagger
 * /vitimas/{id}/odontograma:
 *   post:
 *     summary: Adicionar um odontograma a uma vítima
 *     description: Adiciona um odontograma a uma vítima específica
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da vítima para adicionar o odontograma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               odontogramaId:
 *                 type: string
 *                 description: ID do odontograma a ser adicionado
 *     responses:
 *       200:
 *         description: Odontograma adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       404:
 *         description: Vítima não encontrada
 *       500:
 *         description: Erro ao adicionar odontograma
 *   delete:
 *     summary: Remover um odontograma de uma vítima
 *     description: Remove um odontograma de uma vítima específica
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da vítima para remover o odontograma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               odontogramaId:
 *                 type: string
 *                 description: ID do odontograma a ser removido
 *     responses:
 *       200:
 *         description: Odontograma removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       404:
 *         description: Vítima não encontrada
 *       500:
 *         description: Erro ao remover odontograma
 */
router.route("/:id/odontograma")
    .post(authMiddleware("admin", "perito"), addOdontogramaToVitima)
    .delete(authMiddleware("admin", "perito"), removeOdontogramaFromVitima);

export default router;

