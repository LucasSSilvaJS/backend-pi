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
 *     summary: Criar um novo caso
 *     description: Cria um novo caso
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               titulo:
 *                 type: string
 *                 description: Título do caso
 *               descricao:
 *                 type: string
 *                 description: Descrição do caso
 *               status:
 *                 type: string
 *                 description: Status do caso
 *               dataAbertura:
 *                 type: string
 *                 description: Data de abertura do caso
 *               dataFechamento:
 *                 type: string
 *                 description: Data de fechamento do caso
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do caso
 *                 titulo:
 *                   type: string
 *                   description: Título do caso
 *                 descricao:
 *                   type: string
 *                   description: Descrição do caso
 *                 status:
 *                   type: string
 *                   description: Status do caso
 *                 dataAbertura:
 *                   type: string
 *                   description: Data de abertura do caso
 *                 dataFechamento:
 *                   type: string
 *                   description: Data de fechamento do caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das evidências associadas ao caso
 *                 relatorios:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs dos relatórios associados ao caso
 *                 vitimas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das vítimas associadas ao caso
 *       500:
 *         description: Erro ao criar o caso
 *
 *   get:
 *     summary: Obter todos os casos
 *     description: Retorna todos os casos cadastrados
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID do caso
 *                   titulo:
 *                     type: string
 *                     description: Título do caso
 *                   descricao:
 *                     type: string
 *                     description: Descrição do caso
 *                   status:
 *                     type: string
 *                     description: Status do caso
 *                   dataAbertura:
 *                     type: string
 *                     description: Data de abertura do caso
 *                   dataFechamento:
 *                     type: string
 *                     description: Data de fechamento do caso
 *                   evidencias:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs das evidências associadas ao caso
 *                   relatorios:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs dos relatórios associados ao caso
 *                   vitimas:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: IDs das vítimas associadas ao caso
 *       500:
 *         description: Erro ao obter a lista de casos
 */
router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllCasos)
    .post(authMiddleware("admin", "perito"), createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Obter um caso por ID
 *     description: Retorna um caso específico com base no ID fornecido
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do caso
 *                 titulo:
 *                   type: string
 *                   description: Título do caso
 *                 descricao:
 *                   type: string
 *                   description: Descrição do caso
 *                 status:
 *                   type: string
 *                   description: Status do caso
 *                 dataAbertura:
 *                   type: string
 *                   description: Data de abertura do caso
 *                 dataFechamento:
 *                   type: string
 *                   description: Data de fechamento do caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das evidências associadas ao caso
 *                 relatorios:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs dos relatórios associados ao caso
 *                 vitimas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das vítimas associadas ao caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao buscar o caso
 *
 *   put:
 *     summary: Atualizar um caso
 *     description: Atualiza um caso existente
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               titulo:
 *                 type: string
 *                 description: Título do caso
 *               descricao:
 *                 type: string
 *                 description: Descrição do caso
 *               status:
 *                 type: string
 *                 description: Status do caso
 *               dataAbertura:
 *                 type: string
 *                 description: Data de abertura do caso
 *               dataFechamento:
 *                 type: string
 *                 description: Data de fechamento do caso
 *               evidencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs das evidências associadas ao caso
 *               relatorios:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs dos relatórios associados ao caso
 *               vitimas:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs das vítimas associadas ao caso
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do caso
 *                 titulo:
 *                   type: string
 *                   description: Título do caso
 *                 descricao:
 *                   type: string
 *                   description: Descrição do caso
 *                 status:
 *                   type: string
 *                   description: Status do caso
 *                 dataAbertura:
 *                   type: string
 *                   description: Data de abertura do caso
 *                 dataFechamento:
 *                   type: string
 *                   description: Data de fechamento do caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das evidências associadas ao caso
 *                 relatorios:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs dos relatórios associados ao caso
 *                 vitimas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das vítimas associadas ao caso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao atualizar o caso
 *
 *   delete:
 *     summary: Excluir um caso
 *     description: Exclui um caso existente
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *     responses:
 *       200:
 *         description: Caso excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao excluir o caso
 */
router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getCasoById)
    .put(authMiddleware("admin", "perito"), updateCaso)
    .delete(authMiddleware("admin", "perito"), deleteCaso);

/**
 * @swagger
 * /casos/{id}/evidencias:
 *   post:
 *     summary: Adicionar uma evidência ao caso
 *     description: Adiciona uma evidência a um caso específico
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               idEvidencia:
 *                 type: string
 *                 description: ID da evidência a ser adicionada
 *     responses:
 *       200:
 *         description: Evidência adicionada ao caso com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao adicionar evidência ao caso
 *   delete:
 *     summary: Remover uma evidência do caso
 *     description: Remove uma evidência de um caso específico
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               idEvidencia:
 *                 type: string
 *                 description: ID da evidência a ser removida
 *     responses:
 *       200:
 *         description: Evidência removida do caso com sucesso
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
 *     summary: Adicionar um relatório ao caso
 *     description: Adiciona um relatório a um caso específico
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               idRelatorio:
 *                 type: string
 *                 description: ID do relatório a ser adicionado
 *     responses:
 *       200:
 *         description: Relatório adicionado ao caso com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao adicionar relatório ao caso
 *   delete:
 *     summary: Remover um relatório do caso
 *     description: Remove um relatório de um caso específico
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               idRelatorio:
 *                 type: string
 *                 description: ID do relatório a ser removido
 *     responses:
 *       200:
 *         description: Relatório removido do caso com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao remover relatório do caso
 */
router.route('/:id/relatorios')
    .post(authMiddleware("admin", "perito"), addRelatorioToCaso)
    .delete(authMiddleware("admin", "perito"), removeRelatorioFromCaso);

/**
 * @swagger
 * /casos/{id}/vitimas:
 *   post:
 *     summary: Adicionar uma vítima ao caso
 *     description: Adiciona uma vítima a um caso específico
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               idVitima:
 *                 type: string
 *                 description: ID da vítima a ser adicionada
 *     responses:
 *       200:
 *         description: Vítima adicionada ao caso com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao adicionar vítima ao caso
 *   delete:
 *     summary: Remover uma vítima do caso
 *     description: Remove uma vítima de um caso específico
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
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
 *               idVitima:
 *                 type: string
 *                 description: ID da vítima a ser removida
 *     responses:
 *       200:
 *         description: Vítima removida do caso com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao remover vítima do caso
 */
router.route('/:id/vitimas')
    .post(authMiddleware("admin", "perito"), addVitimaToCaso)
    .delete(authMiddleware("admin", "perito"), removeVitimaFromCaso);

export default router;