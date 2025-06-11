import express from "express";
import { getQuantidadeCasos, getQuantidadeEvidencias, getQuantidadeVitimas, getQuantidadeVitimasPorGeneroDeUmCaso, getQuantidadeVitimasPorEtniaDeUmCaso, getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso, getQuantidadeCasosPorStatus, getQuantidadeCasosUltimosMeses, getQuantidadeCasosAtivos, getQuantidadeTotalEvidencias, getQuantidadeTotalLaudos, getAllDashboardStats } from "../controllers/dashboard.controller.js";
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
 *     summary: Obtém todas as estatísticas do dashboard com filtros dinâmicos
 *     description: Retorna um objeto contendo todas as estatísticas do sistema, podendo ser filtradas por diversos parâmetros
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Em andamento, Finalizado, Arquivado]
 *         description: Filtra por status do caso
 *       - in: query
 *         name: genero
 *         schema:
 *           type: string
 *           enum: [Masculino, Feminino]
 *         description: Filtra por gênero das vítimas
 *       - in: query
 *         name: etnia
 *         schema:
 *           type: string
 *         description: Filtra por etnia das vítimas. Aceita diferentes formatos de texto (minúsculo, maiúsculo, capitalize). Exemplos: "preto", "Preto", "PRETO", "pardo", "Pardo", "PARDO", "indigena", "Indigena", "INDIGENA", "amarelo", "Amarelo", "AMARELO", "branco", "Branco", "BRANCO"
 *       - in: query
 *         name: mesInicial
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Mês inicial do período (1-12)
 *       - in: query
 *         name: mesFinal
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Mês final do período (1-12)
 *       - in: query
 *         name: anoInicial
 *         schema:
 *           type: integer
 *         description: Ano inicial do período
 *       - in: query
 *         name: anoFinal
 *         schema:
 *           type: integer
 *         description: Ano final do período
 *       - in: query
 *         name: idadeMin
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Idade mínima das vítimas
 *       - in: query
 *         name: idadeMax
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Idade máxima das vítimas
 *     responses:
 *       200:
 *         description: Todas as estatísticas do dashboard com filtros aplicados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filtrosAplicados:
 *                   type: object
 *                   description: Filtros que foram aplicados na consulta
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status do caso filtrado
 *                     genero:
 *                       type: string
 *                       description: Gênero das vítimas filtrado
 *                     etnia:
 *                       type: string
 *                       description: Etnia das vítimas filtrada
 *                     periodo:
 *                       type: object
 *                       description: Período filtrado
 *                       properties:
 *                         mesInicial:
 *                           type: integer
 *                           description: Mês inicial do período
 *                         mesFinal:
 *                           type: integer
 *                           description: Mês final do período
 *                         anoInicial:
 *                           type: integer
 *                           description: Ano inicial do período
 *                         anoFinal:
 *                           type: integer
 *                           description: Ano final do período
 *                     idade:
 *                       type: object
 *                       description: Faixa etária filtrada
 *                       properties:
 *                         minima:
 *                           type: integer
 *                           description: Idade mínima
 *                         maxima:
 *                           type: integer
 *                           description: Idade máxima
 *                 estatisticasGerais:
 *                   type: object
 *                   properties:
 *                     totalCasos:
 *                       type: integer
 *                       description: Total de casos que atendem aos filtros
 *                     casosAtivos:
 *                       type: integer
 *                       description: Total de casos ativos que atendem aos filtros
 *                     casosPorStatus:
 *                       type: object
 *                       properties:
 *                         emAndamento:
 *                           type: integer
 *                           description: Casos em andamento
 *                         finalizados:
 *                           type: integer
 *                           description: Casos finalizados
 *                         arquivados:
 *                           type: integer
 *                           description: Casos arquivados
 *                 estatisticasEvidencias:
 *                   type: object
 *                   properties:
 *                     totalEvidencias:
 *                       type: integer
 *                       description: Total de evidências dos casos filtrados
 *                 estatisticasLaudos:
 *                   type: object
 *                   properties:
 *                     totalLaudos:
 *                       type: integer
 *                       description: Total de laudos dos casos filtrados
 *                 estatisticasVitimas:
 *                   type: object
 *                   properties:
 *                     totalVitimas:
 *                       type: integer
 *                       description: Total de vítimas que atendem aos filtros
 *                     porGenero:
 *                       type: object
 *                       properties:
 *                         masculino:
 *                           type: integer
 *                           description: Total de vítimas do gênero masculino
 *                         feminino:
 *                           type: integer
 *                           description: Total de vítimas do gênero feminino
 *                     porEtnia:
 *                       type: object
 *                       properties:
 *                         preto:
 *                           type: integer
 *                           description: Total de vítimas pretas
 *                         pardo:
 *                           type: integer
 *                           description: Total de vítimas pardas
 *                         indigena:
 *                           type: integer
 *                           description: Total de vítimas indígenas
 *                         amarelo:
 *                           type: integer
 *                           description: Total de vítimas amarelas
 *                         branco:
 *                           type: integer
 *                           description: Total de vítimas brancas
 *                         naoInformado:
 *                           type: integer
 *                           description: Total de vítimas sem etnia informada
 *                     porIdade:
 *                       type: object
 *                       additionalProperties:
 *                         type: integer
 *                       description: Distribuição de vítimas por idade
 *                 casosPorMes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mes:
 *                         type: string
 *                         description: Nome do mês
 *                       ano:
 *                         type: integer
 *                         description: Ano
 *                       quantidade:
 *                         type: integer
 *                         description: Quantidade de casos no mês
 *       500:
 *         description: Erro ao obter estatísticas do dashboard
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

router.route('/todas-estatisticas')
    .get(authMiddleware("admin", "perito", "assistente"), getAllDashboardStats);

export default router;

