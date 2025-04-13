import express from "express";
import {
    createCaso,
    getAllCasos,
    getCasoById,
    updateCaso,
    deleteCaso,
    addPacienteToCaso
} from '../controllers/caso.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Retorna todos os casos
 *     tags:
 *       - Casos
 *     responses:
 *       200:
 *         description: Retorna todos os casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 *   post:
 *     summary: Cria um novo caso
 *     tags:
 *       - Casos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Caso de teste
 *               descricao:
 *                 type: string
 *                 example: Este   um caso de teste
 *               status:
 *                 type: string
 *                 enum: ['Em andamento', 'Finalizado', 'Arquivado']
 *                 example: Em andamento
 *               dataAbertura:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               dataFechamento:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               dataOcorrencia:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               paciente:
 *                 type: string
 *                 example: 62577f659574d76626b2
 *               localizacao:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: string
 *                     example: -23.5505191
 *                   longitude:
 *                     type: string
 *                     example: -46.6333094
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso criado com sucesso!
 *                 caso:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 62577f659574d76626b2
 *                     titulo:
 *                       type: string
 *                       example: Caso de teste
 *                     descricao:
 *                       type: string
 *                       example: Este   um caso de teste
 *                     status:
 *                       type: string
 *                       enum: ['Em andamento', 'Finalizado', 'Arquivado']
 *                       example: Em andamento
 *                     dataAbertura:
 *                       type: string
 *                       format: date
 *                       example: 2022-01-01
 *                     dataFechamento:
 *                       type: string
 *                       format: date
 *                       example: 2022-01-01
 *                     dataOcorrencia:
 *                       type: string
 *                       format: date
 *                       example: 2022-01-01
 *                     paciente:
 *                       type: string
 *                       example: 62577f659574d76626b2
 *                     localizacao:
 *                       type: object
 *                       properties:
 *                         latitude:
 *                           type: string
 *                           example: -23.5505191
 *                         longitude:
 *                           type: string
 *                           example: -46.6333094
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 */
router.route('/')
    .get(authMiddleware("admin", "perito"), getAllCasos)
    .post(authMiddleware("admin", "perito"), createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso pelo id
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do caso
 *     responses:
 *       200:
 *         description: Retorna um caso pelo id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 62577f659574d76626b2
 *                 titulo:
 *                   type: string
 *                   example: Caso de teste
 *                 status:
 *                   type: string
 *                   enum: ['Em andamento', 'Finalizado', 'Arquivado']
 *                   example: Em andamento
 *                 dataAbertura:
 *                   type: string
 *                   format: date
 *                   example: 2022-01-01
 *                 dataFechamento:
 *                   type: string
 *                   format: date
 *                   example: 2022-01-01
 *                 dataOcorrencia:
 *                   type: string
 *                   format: date
 *                   example: 2022-01-01
 *                 paciente:
 *                   type: string
 *                   example: 62577f659574d76626b2
 *                 localizacao:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: string
 *                       example: -23.5505191
 *                     longitude:
 *                       type: string
 *                       example: -46.6333094
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não autenticado
 *       404:
 *         description: Caso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 * /casos/{id}:
 *   put:
 *     summary: Atualiza um caso pelo id
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Caso de teste
 *               status:
 *                 type: string
 *                 enum: ['Em andamento', 'Finalizado', 'Arquivado']
 *                 example: Em andamento
 *               dataAbertura:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               dataFechamento:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               dataOcorrencia:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               paciente:
 *                 type: string
 *                 example: 62577f659574d76626b2
 *               localizacao:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: string
 *                     example: -23.5505191
 *                   longitude:
 *                     type: string
 *                     example: -46.6333094
 *     responses:
 *       200:
 *         description: Atualiza um caso pelo id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso atualizado com sucesso!
 *                 caso:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 62577f659574d76626b2
 *                     titulo:
 *                       type: string
 *                       example: Caso de teste
 *                     status:
 *                       type: string
 *                       enum: ['Em andamento', 'Finalizado', 'Arquivado']
 *                       example: Em andamento
 *                     dataAbertura:
 *                       type: string
 *                       format: date
 *                       example: 2022-01-01
 *                     dataFechamento:
 *                       type: string
 *                       format: date
 *                       example: 2022-01-01
 *                     dataOcorrencia:
 *                       type: string
 *                       format: date
 *                       example: 2022-01-01
 *                     paciente:
 *                       type: string
 *                       example: 62577f659574d76626b2
 *                     localizacao:
 *                       type: object
 *                       properties:
 *                         latitude:
 *                           type: string
 *                           example: -23.5505191
 *                         longitude:
 *                           type: string
 *                           example: -46.6333094
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não autenticado
 *       404:
 *         description: Caso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 * /casos/{id}:
 *   delete:
 *     summary: Deleta um caso pelo id
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do caso
 *     responses:
 *       200:
 *         description: Deleta um caso pelo id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso deletado com sucesso!
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não autenticado
 *       404:
 *         description: Caso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 * */
router.route('/:id')
    .get(authMiddleware("admin", "perito"), getCasoById)
    .put(authMiddleware("admin", "perito"), updateCaso)
    .delete(authMiddleware("admin", "perito"), deleteCaso);

/**
 * @swagger
 * /casos/add-paciente:
 *   patch:
 *     summary: Adiciona um paciente a um caso
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pacienteId:
 *                 type: string
 *                 required: true
 *                 description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente adicionado ao caso com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente adicionado ao caso com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não autenticado
 *       404:
 *         description: Caso ou paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Caso ou paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor
 * */
router.route('/add-paciente')
    .patch(authMiddleware("admin", "perito"), addPacienteToCaso);

export default router;