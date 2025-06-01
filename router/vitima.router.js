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
 *     summary: Get all Vitimas
 *     description: Get all Vitimas
 *     tags:
 *       - Vitimas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vitimas found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vitima'
 *       500:
 *         description: Error finding Vitimas
 *   post:
 *     summary: Create a Vitima
 *     description: Create a Vitima
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
 *         description: Vitima created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error creating Vitima
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
 *     summary: Add an odontograma to a vitima
 *     description: Add an odontograma to a vitima
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
 *         description: The ID of the vitima to add the odontograma to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               odontogramaId:
 *                 type: string
 *                 description: The ID of the odontograma to add
 *     responses:
 *       200:
 *         description: Odontograma added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       404:
 *         description: Vitima nao encontrada
 *       500:
 *         description: Error adding odontograma
 *   delete:
 *     summary: Remove an odontograma from a vitima
 *     description: Remove an odontograma from a vitima
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
 *         description: The ID of the vitima to remove the odontograma from
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               odontogramaId:
 *                 type: string
 *                 description: The ID of the odontograma to remove
 *     responses:
 *       200:
 *         description: Odontograma removed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitima'
 *       404:
 *         description: Vitima nao encontrada
 *       500:
 *         description: Error removing odontograma
 */
router.route("/:id/odontograma")
    .post(authMiddleware("admin", "perito"), addOdontogramaToVitima)
    .delete(authMiddleware("admin", "perito"), removeOdontogramaFromVitima);

export default router;

