import express from "express";
import {
    createPaciente,
    getAllPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente,
    addCasoToPaciente
} from '../controllers/paciente.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     security:
 *       - bearerAuth: []
 *     description: Cria um novo paciente com base nos dados fornecidos
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               rg:
 *                 type: string
 *                 example: 12.345.678-9
 *               status:
 *                 type: string
 *                 example: Ativo
 *               caso:
 *                 type: string
 *                 example: 62e0a54f7f5a4a0e5e7ec7e5
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente criado com sucesso!
 *                 paciente:
 *                   $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro ao criar paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao criar paciente
 *
 *   get:
 *     summary: Retorna todos os pacientes
 *     security:
 *       - bearerAuth: []
 *     description: Lista todos os pacientes cadastrados
 *     tags:
 *       - Pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro ao listar pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao listar pacientes
 */
router.route('/')
    .get(authMiddleware("admin", "perito"), getAllPacientes)
    .post(authMiddleware("admin", "perito"), createPaciente);

/**
 * @swagger
 * /pacientes/add-caso:
 *   patch:
 *     summary: Adiciona um caso a um paciente
 *     security:
 *       - bearerAuth: []
 *     description: Associa um caso existente a um paciente existente.
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCaso:
 *                 type: string
 *                 example: 62e0a54f7f5a4a0e5e7ec7e5
 *               idPaciente:
 *                 type: string
 *                 example: 62e0a54f7f5a4a0e5e7ec7e5
 *     responses:
 *       200:
 *         description: Caso adicionado ao paciente com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso adicionado ao paciente com sucesso!
 *                 paciente:
 *                   $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: idCaso e idPaciente são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: idCaso e idPaciente são obrigatórios
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 *       500:
 *         description: Erro ao adicionar caso ao paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao adicionar caso ao paciente
 */
router.route('/add-caso')
    .patch(authMiddleware("admin", "perito"), addCasoToPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Retorna um paciente por ID
 *     security:
 *       - bearerAuth: []
 *     description: Retorna um paciente com base no ID fornecido
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente obtido com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 *       500:
 *         description: Erro ao obter paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao obter paciente
 *
 *   put:
 *     summary: Atualiza um paciente
 *     security:
 *       - bearerAuth: []
 *     description: Atualiza um paciente com base nos dados fornecidos
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               rg:
 *                 type: string
 *                 example: 12.345.678-9
 *               status:
 *                 type: string
 *                 example: Ativo
 *               caso:
 *                 type: string
 *                 example: 62e0a54f7f5a4a0e5e7ec7e5
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente atualizado com sucesso!
 *                 paciente:
 *                   $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 *       500:
 *         description: Erro ao atualizar paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao atualizar paciente
 *
 *   delete:
 *     summary: Deleta um paciente
 *     security:
 *       - bearerAuth: []
 *     description: Deleta um paciente com base no ID fornecido
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente deletado com sucesso!
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Paciente não encontrado
 *       500:
 *         description: Erro ao deletar paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao deletar paciente
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito"), getPacienteById)
    .put(authMiddleware("admin", "perito"), updatePaciente)
    .delete(authMiddleware("admin", "perito"), deletePaciente);



export default router;
