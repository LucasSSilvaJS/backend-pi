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
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - vitimas
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do caso
 *         titulo:
 *           type: string
 *           description: Título do caso
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do caso
 *         status:
 *           type: string
 *           enum: [Em andamento, Finalizado, Arquivado]
 *           default: Em andamento
 *           description: Status atual do caso
 *         dataAbertura:
 *           type: string
 *           format: date-time
 *           description: Data de abertura do caso
 *         dataFechamento:
 *           type: string
 *           format: date-time
 *           description: Data de fechamento do caso (opcional)
 *         geolocalizacao:
 *           type: object
 *           properties:
 *             latitude:
 *               type: string
 *               description: Latitude do local do caso
 *             longitude:
 *               type: string
 *               description: Longitude do local do caso
 *         evidencias:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs das evidências associadas ao caso
 *         relatorio:
 *           type: string
 *           description: ID do relatório associado ao caso (opcional)
 *         vitimas:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs das vítimas associadas ao caso
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *     Relatorio:
 *       type: object
 *       required:
 *         - titulo
 *         - conteudo
 *         - peritoResponsavel
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do relatório
 *         titulo:
 *           type: string
 *           description: Título do relatório
 *         conteudo:
 *           type: string
 *           description: Conteúdo do relatório (gerado por LLM)
 *         peritoResponsavel:
 *           type: string
 *           description: ID do perito responsável pelo relatório
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação do relatório
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 */

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Criar um novo caso
 *     description: Cria um novo caso com as informações básicas
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todos os casos
 *     description: Retorna uma lista paginada de todos os casos cadastrados com opções de busca por título, descrição e status
 *     tags:
 *       - Casos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Buscar casos por título (busca parcial, case insensitive)
 *         example: "homicídio"
 *       - in: query
 *         name: descricao
 *         schema:
 *           type: string
 *         description: Buscar casos por descrição (busca parcial, case insensitive)
 *         example: "vítima encontrada"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Em andamento, Finalizado, Arquivado]
 *         description: Filtrar casos por status
 *         example: "Em andamento"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página (inicia em 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de itens por página (máximo 100)
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista paginada de casos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 casos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Caso'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       description: Página atual
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       description: Total de páginas
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       description: Total de itens que atendem aos filtros
 *                       example: 47
 *                     itemsPerPage:
 *                       type: integer
 *                       description: Itens por página
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       description: Se existe próxima página
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       description: Se existe página anterior
 *                       example: false
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                       description: Número da próxima página
 *                       example: 2
 *                     prevPage:
 *                       type: integer
 *                       nullable: true
 *                       description: Número da página anterior
 *                       example: null
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
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
 *                 relatorio:
 *                   type: string
 *                   description: ID do relatório associado ao caso
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
 *               geolocalizacao:
 *                 type: object
 *                 description: Geolocalização do caso
 *                 properties:
 *                   latitude:
 *                     type: string
 *                     description: Latitude do caso
 *                   longitude:
 *                     type: string
 *                     description: Longitude do caso
 *               evidencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs das evidências associadas ao caso
 *               relatorio:
 *                 type: string
 *                 description: ID do relatório associado ao caso
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
 *                 geolocalizacao:
 *                   type: object
 *                   description: Geolocalização do caso
 *                   properties:
 *                     latitude:
 *                       type: string
 *                       description: Latitude do caso
 *                     longitude:
 *                       type: string
 *                       description: Longitude do caso
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: IDs das evidências associadas ao caso
 *                 relatorio:
 *                   type: string
 *                   description: ID do relatório associado ao caso
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
 * /casos/relatorio:
 *   post:
 *     summary: Adicionar um relatório ao caso
 *     description: Adiciona um único relatório ao caso. Se o caso já possuir um relatório, retorna erro.
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
 *             required:
 *               - idCaso
 *               - idRelatorio
 *             properties:
 *               idCaso:
 *                 type: string
 *                 description: ID do caso
 *               idRelatorio:
 *                 type: string
 *                 description: ID do relatório a ser adicionado
 *     responses:
 *       200:
 *         description: Relatório adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Caso já possui um relatório
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Caso ou relatório não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Remover o relatório do caso
 *     description: Remove o relatório associado ao caso e o deleta do banco de dados
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
 *             required:
 *               - idCaso
 *               - idRelatorio
 *             properties:
 *               idCaso:
 *                 type: string
 *                 description: ID do caso
 *               idRelatorio:
 *                 type: string
 *                 description: ID do relatório a ser removido
 *     responses:
 *       200:
 *         description: Relatório removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Caso não possui o relatório especificado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.route('/relatorio')
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