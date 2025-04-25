import express from "express";
import {
    createCaso,
    getAllCasos,
    getCasoById,
    updateCaso,
    deleteCaso,
    addPacienteToCaso
} from '../controllers/caso.controller.js';
import { listarCasos } from '../controllers/lista.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     security:
 *       - bearerAuth: [] 
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
 *                 example: Em andamento
 *               dataAbertura:
 *                 type: string
 *                 format: date-time
 *                 example: 2022-01-01T00:00:00.000Z
 *               dataFechamento:
 *                 type: string
 *                 format: date-time
 *                 example: 2022-01-01T00:00:00.000Z
 *               dataOcorrencia:
 *                 type: string
 *                 format: date-time
 *                 example: 2022-01-01T00:00:00.000Z
 *               paciente:
 *                 type: string
 *                 example: 620e0e2a6f0a4c3a1a5e2f3a
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
 *                       example: 620e0e2a6f0a4c3a1a5e2f3a
 *                     titulo:
 *                       type: string
 *                       example: Caso de teste
 *                     descricao:
 *                       type: string
 *                       example: Este   um caso de teste
 *                     status:
 *                       type: string
 *                       example: Em andamento
 *                     dataAbertura:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     dataFechamento:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     dataOcorrencia:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     paciente:
 *                       type: string
 *                       example: 620e0e2a6f0a4c3a1a5e2f3a
 *                     localizacao:
 *                       type: object
 *                       properties:
 *                         latitude:
 *                           type: string
 *                           example: -23.5505191
 *                         longitude:
 *                           type: string
 *                           example: -46.6333094
 *       500:
 *         description: Erro ao criar caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao criar caso
 *
 *   get:
 *     summary: Retorna todos os casos
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: Em andamento
 *         description: Filtra os casos pelo status
 *       - in: query
 *         name: dataAbertura
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2022-01-01T00:00:00.000Z
 *         description: Filtra os casos pela data de abertura
 *     responses:
 *       200:
 *         description: Retorna todos os casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 620e0e2a6f0a4c3a1a5e2f3a
 *                   titulo:
 *                     type: string
 *                     example: Caso de teste
 *                   descricao:
 *                     type: string
 *                     example: Este   um caso de teste
 *                   status:
 *                     type: string
 *                     example: Em andamento
 *                   dataAbertura:
 *                     type: string
 *                     format: date-time
 *                     example: 2022-01-01T00:00:00.000Z
 *                   dataFechamento:
 *                     type: string
 *                     format: date-time
 *                     example: 2022-01-01T00:00:00.000Z
 *                   dataOcorrencia:
 *                     type: string
 *                     format: date-time
 *                     example: 2022-01-01T00:00:00.000Z
 *                   paciente:
 *                     type: string
 *                     example: 620e0e2a6f0a4c3a1a5e2f3a
 *                   localizacao:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: string
 *                         example: -23.5505191
 *                       longitude:
 *                         type: string
 *                         example: -46.6333094
 *       500:
 *         description: Erro ao filtrar casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao filtrar casos
 */
router.route('/')
    .get(authMiddleware("admin", "perito"), getAllCasos)
    .post(authMiddleware("admin", "perito"), createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso pelo id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O id do caso
 *     responses:
 *       200:
 *         description: Retorna um caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 620e0e2a6f0a4c3a1a5e2f3a
 *                 titulo:
 *                   type: string
 *                   example: Caso de teste
 *                 descricao:
 *                   type: string
 *                   example: Este   um caso de teste
 *                 status:
 *                   type: string
 *                   example: Em andamento
 *                 dataAbertura:
 *                   type: string
 *                   format: date-time
 *                   example: 2022-01-01T00:00:00.000Z
 *                 dataFechamento:
 *                   type: string
 *                   format: date-time
 *                   example: 2022-01-01T00:00:00.000Z
 *                 dataOcorrencia:
 *                   type: string
 *                   format: date-time
 *                   example: 2022-01-01T00:00:00.000Z
 *                 paciente:
 *                   type: string
 *                   example: 620e0e2a6f0a4c3a1a5e2f3a
 *                 localizacao:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: string
 *                       example: -23.5505191
 *                     longitude:
 *                       type: string
 *                       example: -46.6333094
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
 *         description: Erro ao obter caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao obter caso
 *   put:
 *     summary: Atualiza um caso
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O id do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Caso de teste atualizado
 *               descricao:
 *                 type: string
 *                 example: Este   um caso de teste atualizado
 *               status:
 *                 type: string
 *                 example: Finalizado
 *               dataAbertura:
 *                 type: string
 *                 format: date-time
 *                 example: 2022-01-01T00:00:00.000Z
 *               dataFechamento:
 *                 type: string
 *                 format: date-time
 *                 example: 2022-01-01T00:00:00.000Z
 *               dataOcorrencia:
 *                 type: string
 *                 format: date-time
 *                 example: 2022-01-01T00:00:00.000Z
 *               paciente:
 *                 type: string
 *                 example: 620e0e2a6f0a4c3a1a5e2f3a
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
 *         description: Caso atualizado com sucesso!
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
 *                       example: 620e0e2a6f0a4c3a1a5e2f3a
 *                     titulo:
 *                       type: string
 *                       example: Caso de teste atualizado
 *                     descricao:
 *                       type: string
 *                       example: Este   um caso de teste atualizado
 *                     status:
 *                       type: string
 *                       example: Finalizado
 *                     dataAbertura:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     dataFechamento:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     dataOcorrencia:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     paciente:
 *                       type: string
 *                       example: 620e0e2a6f0a4c3a1a5e2f3a
 *                     localizacao:
 *                       type: object
 *                       properties:
 *                         latitude:
 *                           type: string
 *                           example: -23.5505191
 *                         longitude:
 *                           type: string
 *                           example: -46.6333094
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
 *         description: Erro ao atualizar caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao atualizar caso
 *   delete:
 *     summary: Deleta um caso
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Casos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O id do caso
 *     responses:
 *       200:
 *         description: Caso deletado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso deletado com sucesso!
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
 *         description: Erro ao deletar caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao deletar caso
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
 *     security:
 *       - bearerAuth: []
 *     description: Adiciona um paciente a um caso
 *     tags:
 *       - Casos
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
 *         description: Paciente adicionado ao caso com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente adicionado ao caso com sucesso!
 *                 caso:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 62e0a54f7f5a4a0e5e7ec7e5
 *                     titulo:
 *                       type: string
 *                       example: Titulo do caso
 *                     descricao:
 *                       type: string
 *                       example: Descri o do caso
 *                     status:
 *                       type: string
 *                       example: Em andamento
 *                     dataAbertura:
 *                       type: string
 *                       example: 2022-07-22T14:30:00.000Z
 *                     dataFechamento:
 *                       type: string
 *                       example: 2022-07-22T14:30:00.000Z
 *                     paciente:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 62e0a54f7f5a4a0e5e7ec7e5
 *                         nome:
 *                           type: string
 *                           example: Nome do paciente
 *                         cpf:
 *                           type: string
 *                           example: 123.456.789-00
 *                         dataNascimento:
 *                           type: string
 *                           example: 1990-01-01
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
router.route('/add-paciente')
    .patch(authMiddleware("admin", "perito"), addPacienteToCaso);

/**
 * @swagger
 * /casos/lista:
 *   get:
 *     summary: Lista os títulos dos casos com seus IDs, IDs de evidências e IDs de pacientes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Casos
 *     responses:
 *       200:
 *         description: Lista de casos com informações relacionadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "620e0e2a6f0a4c3a1a5e2f3a"
 *                       titulo:
 *                         type: string
 *                         example: "Caso de teste"
 *                       evidencias:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["620e0e2a6f0a4c3a1a5e2f3b", "620e0e2a6f0a4c3a1a5e2f3c"]
 *                       pacienteId:
 *                         type: string
 *                         example: "620e0e2a6f0a4c3a1a5e2f3d"
 *       500:
 *         description: Erro ao listar casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro ao listar casos"
 *                 error:
 *                   type: string
 *                   example: "Erro interno do servidor"
 */
router.get('/lista', authMiddleware("admin", "perito"), listarCasos);

export default router;