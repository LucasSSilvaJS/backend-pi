import express from "express";
import {
    createCaso,
    getAllCasos,
    getCasoById,
    updateCaso,
    deleteCaso,
    addEvidenciaToCaso,
    removeEvidenciaFromCaso,
    addRelatorioToCaso,
    removeRelatorioFromCaso,
    addVitimaToCaso,
    removeVitimaFromCaso
} from '../controllers/caso.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Create a new caso
 *     description: Create a new caso
 *     tags:
 *       - Casos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID
 *               titulo:
 *                 type: string
 *                 description: The title of the caso
 *               descricao:
 *                 type: string
 *                 description: The description of the caso
 *               status:
 *                 type: string
 *                 description: The status of the caso
 *               dataAbertura:
 *                 type: string
 *                 description: The start date of the caso
 *               dataFechamento:
 *                 type: string
 *                 description: The end date of the caso
 *     responses:
 *       201:
 *         description: The created caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the caso
 *                 titulo:
 *                   type: string
 *                   description: The title of the caso
 *                 descricao:
 *                   type: string
 *                   description: The description of the caso
 *                 status:
 *                   type: string
 *                   description: The status of the caso
 *                 dataAbertura:
 *                   type: string
 *                   description: The start date of the caso
 *                 dataFechamento:
 *                   type: string
 *                   description: The end date of the caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The evidence IDs associated with the caso
 *                 relatorios:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The report IDs associated with the caso
 *                 vitimas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The vitima IDs associated with the caso
 *       500:
 *         description: Error creating the caso
 *
 *   get:
 *     summary: Get all casos
 *     description: Get all casos
 *     tags:
 *       - Casos
 *     responses:
 *       200:
 *         description: The list of all casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the caso
 *                   titulo:
 *                     type: string
 *                     description: The title of the caso
 *                   descricao:
 *                     type: string
 *                     description: The description of the caso
 *                   status:
 *                     type: string
 *                     description: The status of the caso
 *                   dataAbertura:
 *                     type: string
 *                     description: The start date of the caso
 *                   dataFechamento:
 *                     type: string
 *                     description: The end date of the caso
 *                   evidencias:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The evidence IDs associated with the caso
 *                   relatorios:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The report IDs associated with the caso
 *                   vitimas:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The vitima IDs associated with the caso
 *       500:
 *         description: Error getting the list of casos
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllCasos)
    .post(authMiddleware("admin", "perito"), createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Get a caso by id
 *     description: Get a caso by id
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     responses:
 *       200:
 *         description: The caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the caso
 *                 titulo:
 *                   type: string
 *                   description: The title of the caso
 *                 descricao:
 *                   type: string
 *                   description: The description of the caso
 *                 status:
 *                   type: string
 *                   description: The status of the caso
 *                 dataAbertura:
 *                   type: string
 *                   description: The start date of the caso
 *                 dataFechamento:
 *                   type: string
 *                   description: The end date of the caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The evidence IDs associated with the caso
 *                 relatorios:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The report IDs associated with the caso
 *                 vitimas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The vitima IDs associated with the caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error getting the caso
 *
 *   put:
 *     summary: Update a caso
 *     description: Update a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: The title of the caso
 *               descricao:
 *                 type: string
 *                 description: The description of the caso
 *               status:
 *                 type: string
 *                 description: The status of the caso
 *               dataAbertura:
 *                 type: string
 *                 description: The start date of the caso
 *               dataFechamento:
 *                 type: string
 *                 description: The end date of the caso
 *               evidencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The evidence IDs associated with the caso
 *               relatorios:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The report IDs associated with the caso
 *               vitimas:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The vitima IDs associated with the caso
 *     responses:
 *       200:
 *         description: The updated caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the caso
 *                 titulo:
 *                   type: string
 *                   description: The title of the caso
 *                 descricao:
 *                   type: string
 *                   description: The description of the caso
 *                 status:
 *                   type: string
 *                   description: The status of the caso
 *                 dataAbertura:
 *                   type: string
 *                   description: The start date of the caso
 *                 dataFechamento:
 *                   type: string
 *                   description: The end date of the caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The evidence IDs associated with the caso
 *                 relatorios:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The report IDs associated with the caso
 *                 vitimas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The vitima IDs associated with the caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error updating the caso
 *
 *   delete:
 *     summary: Delete a caso
 *     description: Delete a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
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
 *     responses:
 *       200:
 *         description: The caso was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of success
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error deleting the caso
 * */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getCasoById)
    .put(authMiddleware("admin", "perito"), updateCaso)
    .delete(authMiddleware("admin", "perito"), deleteCaso);

/**
 * @swagger
 * /casos/{id}/evidencias:
 *   post:
 *     summary: Add an evidence ID to a caso
 *     description: Add an evidence ID to a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEvidencia:
 *                 type: string
 *                 description: The ID of the evidence to add
 *     responses:
 *       200:
 *         description: Evidence added to caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao adicionar evidência ao caso
 *   delete:
 *     summary: Remove an evidence ID from a caso
 *     description: Remove an evidence ID from a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEvidencia:
 *                 type: string
 *                 description: The ID of the evidence to remove
 *     responses:
 *       200:
 *         description: Evidence removed from caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao remover evidência do caso
 */
router.route('/:id/evidencias')
    .post(authMiddleware("admin", "perito", "assistente"), addEvidenciaToCaso)
    .delete(authMiddleware("admin", "perito", "assistente"), removeEvidenciaFromCaso);


/**
 * @swagger
 * /casos/{id}/relatorios:
 *   post:
 *     summary: Add a report ID to a caso
 *     description: Add a report ID to a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRelatorio:
 *                 type: string
 *                 description: The ID of the report to add
 *     responses:
 *       200:
 *         description: Report added to caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error adding report to caso
 *   delete:
 *     summary: Remove a report ID from a caso
 *     description: Remove a report ID from a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRelatorio:
 *                 type: string
 *                 description: The ID of the report to remove
 *     responses:
 *       200:
 *         description: Report removed from caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error removing report from caso
 */
router.route('/:id/relatorios')
    .post(authMiddleware("admin", "perito"), addRelatorioToCaso)
    .delete(authMiddleware("admin", "perito"), removeRelatorioFromCaso);

/**
 * @swagger
 * /casos/{id}/vitimas:
 *   post:
 *     summary: Add a vitima ID to a caso
 *     description: Add a vitima ID to a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idVitima:
 *                 type: string
 *                 description: The ID of the vitima to add
 *     responses:
 *       200:
 *         description: Vitima added to caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error adding vitima to caso
 *   delete:
 *     summary: Remove a vitima ID from a caso
 *     description: Remove a vitima ID from a caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idVitima:
 *                 type: string
 *                 description: The ID of the vitima to remove
 *     responses:
 *       200:
 *         description: Vitima removed from caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Error removing vitima from caso
 */
router.route('/:id/vitimas')
    .post(authMiddleware("admin", "perito"), addVitimaToCaso)
    .delete(authMiddleware("admin", "perito"), removeVitimaFromCaso);

export default router;