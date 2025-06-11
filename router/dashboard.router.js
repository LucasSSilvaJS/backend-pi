import express from "express";
import { getQuantidadeCasos, getQuantidadeEvidencias, getQuantidadeVitimas, getQuantidadeVitimasPorGeneroDeUmCaso, getQuantidadeVitimasPorEtniaDeUmCaso, getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso, getQuantidadeCasosPorStatus, getQuantidadeCasosUltimosMeses, getQuantidadeCasosAtivos, getQuantidadeTotalEvidencias, getQuantidadeTotalLaudos } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /dashboard/casos:
 *   get:
 *     summary: Obtém a quantidade total de casos
 *     description: Retorna o número total de casos cadastrados no sistema
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade total de casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeCasos:
 *                   type: integer
 *                   description: Quantidade total de casos
 *       500:
 *         description: Erro ao obter estatísticas dos casos
 * 
 * /dashboard/casos/status:
 *   get:
 *     summary: Obtém a quantidade de casos por status
 *     description: Retorna o número de casos separados por status (Em andamento, Finalizado, Arquivado)
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade de casos por status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeEmAndamento:
 *                   type: integer
 *                   description: Quantidade de casos em andamento
 *                 quantidadeFinalizados:
 *                   type: integer
 *                   description: Quantidade de casos finalizados
 *                 quantidadeArquivados:
 *                   type: integer
 *                   description: Quantidade de casos arquivados
 *       500:
 *         description: Erro ao obter estatísticas dos casos por status
 * 
 * /dashboard/evidencias/{id}:
 *   get:
 *     summary: Obtém a quantidade de evidências de um caso específico
 *     description: Retorna o número total de evidências associadas a um caso
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Quantidade de evidências do caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeEvidencias:
 *                   type: integer
 *                   description: Quantidade de evidências do caso
 *       500:
 *         description: Erro ao obter estatísticas das evidências
 * 
 * /dashboard/evidencias/total:
 *   get:
 *     summary: Obtém a quantidade total de evidências
 *     description: Retorna o número total de evidências cadastradas em todos os casos
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade total de evidências
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeTotalEvidencias:
 *                   type: integer
 *                   description: Número total de evidências no sistema
 *       500:
 *         description: Erro ao obter quantidade total de evidências
 * 
 * /dashboard/vitimas/{id}:
 *   get:
 *     summary: Obtém a quantidade de vítimas de um caso específico
 *     description: Retorna o número total de vítimas associadas a um caso
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Quantidade de vítimas do caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeVitimas:
 *                   type: integer
 *                   description: Quantidade de vítimas do caso
 *       500:
 *         description: Erro ao obter estatísticas das vítimas
 * 
 * /dashboard/vitimas/genero/{idCaso}:
 *   get:
 *     summary: Obtém a quantidade de vítimas por gênero de um caso específico
 *     description: Retorna o número de vítimas masculinas e femininas de um caso
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCaso
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Quantidade de vítimas por gênero
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeVitimasMasculinas:
 *                   type: integer
 *                   description: Quantidade de vítimas do gênero masculino
 *                 quantidadeVitimasFemininas:
 *                   type: integer
 *                   description: Quantidade de vítimas do gênero feminino
 *       500:
 *         description: Erro ao obter estatísticas das vítimas por gênero
 * 
 * /dashboard/vitimas/etnia/{idCaso}:
 *   get:
 *     summary: Obtém a quantidade de vítimas por etnia de um caso específico
 *     description: Retorna o número de vítimas por etnia (preta, parda, indígena, amarela) de um caso
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCaso
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Quantidade de vítimas por etnia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeVitimasPretas:
 *                   type: integer
 *                   description: Quantidade de vítimas pretas
 *                 quantidadeVitimasPardas:
 *                   type: integer
 *                   description: Quantidade de vítimas pardas
 *                 quantidadeVitimasIndigenas:
 *                   type: integer
 *                   description: Quantidade de vítimas indígenas
 *                 quantidadeVitimasAmarelas:
 *                   type: integer
 *                   description: Quantidade de vítimas amarelas
 *       500:
 *         description: Erro ao obter estatísticas das vítimas por etnia
 * 
 * /dashboard/vitimas/idade/{idCaso}/{idadeInicial}/{idadeFinal}:
 *   get:
 *     summary: Obtém a quantidade de vítimas por intervalo de idade de um caso específico
 *     description: Retorna o número de vítimas dentro de um intervalo de idade específico
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCaso
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *       - in: path
 *         name: idadeInicial
 *         required: true
 *         schema:
 *           type: integer
 *         description: Idade inicial do intervalo
 *       - in: path
 *         name: idadeFinal
 *         required: true
 *         schema:
 *           type: integer
 *         description: Idade final do intervalo
 *     responses:
 *       200:
 *         description: Quantidade de vítimas no intervalo de idade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeVitimas:
 *                   type: integer
 *                   description: Quantidade de vítimas no intervalo de idade especificado
 *       500:
 *         description: Erro ao obter estatísticas das vítimas por intervalo de idade
 * 
 * /dashboard/casos/ultimos-meses:
 *   get:
 *     summary: Obtém a quantidade de casos dos últimos 5 meses
 *     description: Retorna o número de casos registrados em cada um dos últimos 5 meses, incluindo o mês atual
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade de casos por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mes:
 *                         type: string
 *                         description: Nome do mês
 *                       quantidade:
 *                         type: integer
 *                         description: Quantidade de casos no mês
 *       500:
 *         description: Erro ao obter estatísticas dos casos dos últimos meses
 * /dashboard/casos/ativos/quantidade:
 *   get:
 *     summary: Obtém a quantidade de casos ativos
 *     description: Retorna apenas o número total de casos com status "Em andamento"
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade de casos ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeCasosAtivos:
 *                   type: integer
 *                   description: Número total de casos ativos
 *       500:
 *         description: Erro ao obter quantidade de casos ativos
 * 
 * /dashboard/laudos/total:
 *   get:
 *     summary: Obtém a quantidade total de laudos
 *     description: Retorna o número total de laudos cadastrados no sistema
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade total de laudos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeTotalLaudos:
 *                   type: integer
 *                   description: Número total de laudos no sistema
 *       500:
 *         description: Erro ao obter quantidade total de laudos
 * 
 * /dashboard/todas-estatisticas:
 *   get:
 *     summary: Endpoint removido
 *     description: Esta funcionalidade foi removida conforme solicitado
 *     tags:
 *       - Dashboard
 *     responses:
 *       404:
 *         description: Endpoint não encontrado
 */

router.route('/casos')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeCasos);

router.route('/casos/status')
    .get(authMiddleware("admin", "perito", "assistente"), 
    getQuantidadeCasosPorStatus);

router.route('/evidencias/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeEvidencias);

router.route('/evidencias/total')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeTotalEvidencias);

router.route('/vitimas/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimas);

router.route('/vitimas/genero/:idCaso')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorGeneroDeUmCaso);

router.route('/vitimas/etnia/:idCaso')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorEtniaDeUmCaso);

router.route('/vitimas/idade/:idCaso/:idadeInicial/:idadeFinal')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso);

router.route('/casos/ultimos-meses')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeCasosUltimosMeses);

router.route('/casos/ativos/quantidade')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeCasosAtivos);

router.route('/laudos/total')
    .get(authMiddleware("admin", "perito", "assistente"), getQuantidadeTotalLaudos);

export default router;

