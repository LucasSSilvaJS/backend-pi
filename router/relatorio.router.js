import {
    createRelatorio,
    getAllRelatorios,
    getRelatorioById,
    updateRelatorio,
    deleteRelatorio
} from '../controllers/relatorio.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import express from "express";

const router = express.Router();

/**
 * @swagger
 * /relatorios:
 *   post:
 *     summary: Create a new relatorio
 *     description: Create a new relatorio with title, content, and responsible expert.
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: The title of the relatorio
 *               conteudo:
 *                 type: string
 *                 description: The content of the relatorio
 *               peritoResponsavel:
 *                 type: string
 *                 description: The ID of the responsible expert
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               casoId:
 *                 type: string
 *                 description: The ID of the caso
 *     responses:
 *       201:
 *         description: Relatorio created successfully
 *       500:
 *         description: Error creating relatorio
 *   get:
 *     summary: Get all relatorios
 *     description: Retrieve a list of all relatorios
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of relatorios
 *       500:
 *         description: Error fetching relatorios
 */
router.route('/')
    .post(authMiddleware("admin", "perito"), createRelatorio)
    .get(authMiddleware("admin", "perito", "assistente"), getAllRelatorios);

/**
 * @swagger
 * /relatorios/{id}:
 *   get:
 *     summary: Get a relatorio by ID
 *     description: Retrieve a relatorio by ID
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the relatorio
 *     responses:
 *       200:
 *         description: A relatorio
 *       404:
 *         description: Relatorio not found
 *       500:
 *         description: Error fetching relatorio
 *   put:
 *     summary: Update a relatorio
 *     description: Update a relatorio with title, content, and responsible expert
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the relatorio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: The title of the relatorio
 *               conteudo:
 *                 type: string
 *                 description: The content of the relatorio
 *               peritoResponsavel:
 *                 type: string
 *                 description: The ID of the responsible expert
 *     responses:
 *       200:
 *         description: Relatorio updated successfully
 *       404:
 *         description: Relatorio not found
 *       500:
 *         description: Error updating relatorio
 *   delete:
 *     summary: Delete a relatorio
 *     description: Delete a relatorio
 *     tags:
 *       - Relatorios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the relatorio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               casoId:
 *                 type: string
 *                 description: The ID of the caso
 *     responses:
 *       200:
 *         description: Relatorio deleted successfully
 *       404:
 *         description: Relatorio not found
 *       500:
 *         description: Error deleting relatorio
 */
router.route("/:id")
    .get(authMiddleware("admin", "perito", "assistente"), getRelatorioById)
    .put(authMiddleware("admin", "perito"), updateRelatorio)
    .delete(authMiddleware("admin", "perito"), deleteRelatorio);

export default router;
