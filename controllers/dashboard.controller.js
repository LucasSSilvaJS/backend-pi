import Caso from "../models/caso.model.js";
import Laudo from "../models/laudo.model.js";

//GET QUANTIDADE DE CASOS
export const getQuantidadeCasos = async (req, res) => {
    try {
        const quantidadeCasos = await Caso.countDocuments();
        res.status(200).json({ quantidadeCasos });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas dos casos" });
    }
};

//GET QUANTIDADE DE EVIDENCIAS
export const getQuantidadeEvidencias = async (req, res) => {
    try {
        const { id } = req.params;
        const quantidadeEvidencias = await Caso.findById(id, "evidencias").populate("evidencias");
        res.status(200).json({ quantidadeEvidencias: quantidadeEvidencias.evidencias.length });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das evidências" });
    }
};

//GET QUANTIDADE DE VITIMAS
export const getQuantidadeVitimas = async (req, res) => {
    try {
        const { id } = req.params;
        const quantidadeVitimas = await Caso.findById(id, "vitimas").populate("vitimas");
        res.status(200).json({ quantidadeVitimas: quantidadeVitimas.vitimas.length });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das vítimas" });
    }
};

//GET QUANTIDADE DE VITIMAS POR GÊNERO
export const getQuantidadeVitimasPorGeneroDeUmCaso = async (req, res) => {
    try {
        const { idCaso } = req.params;
        const quantidadeVitimasMasculinas = await Caso.findById(idCaso, "vitimas").populate({
            path: "vitimas",
            match: { genero: "Masculino" }
        });
        const quantidadeVitimasFemininas = await Caso.findById(idCaso, "vitimas").populate({
            path: "vitimas",
            match: { genero: "Feminino" }
        });
        res.status(200).json({
            quantidadeVitimasMasculinas: quantidadeVitimasMasculinas.vitimas.length,
            quantidadeVitimasFemininas: quantidadeVitimasFemininas.vitimas.length
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das vítimas por gênero de um caso" });
    }
};

//GET QUANTIDADE DE VITIMAS POR ETNIA
export const getQuantidadeVitimasPorEtniaDeUmCaso = async (req, res) => {
    try {
        const { idCaso } = req.params;
        const quantidadeVitimasPorEtnia = await Caso.findById(idCaso, "vitimas").populate({
            path: "vitimas",
            select: "corEtnia"
        });
        const quantidadeVitimasPretas = quantidadeVitimasPorEtnia.vitimas.filter(vitima => vitima.corEtnia === "preto").length;
        const quantidadeVitimasPardas = quantidadeVitimasPorEtnia.vitimas.filter(vitima => vitima.corEtnia === "pardo").length;
        const quantidadeVitimasIndigenas = quantidadeVitimasPorEtnia.vitimas.filter(vitima => vitima.corEtnia === "indigena").length;
        const quantidadeVitimasAmarelas = quantidadeVitimasPorEtnia.vitimas.filter(vitima => vitima.corEtnia === "amarelo").length;
        res.status(200).json({
            quantidadeVitimasPretas,
            quantidadeVitimasPardas,
            quantidadeVitimasIndigenas,
            quantidadeVitimasAmarelas
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das vítimas por etnia de um caso" });
    }
};

//GET QUANTIDADE DE VITIMAS POR INTERVALO DE IDADE
export const getQuantidadeVitimasPorIntervaloDeIdadeDeUmCaso = async (req, res) => {
    try {
        const { idCaso, idadeInicial, idadeFinal } = req.params;
        const quantidadeVitimas = await Caso.findById(idCaso, "vitimas").populate({
            path: "vitimas",
            match: { idade: { $gte: idadeInicial, $lte: idadeFinal } }
        });
        res.status(200).json({ quantidadeVitimas: quantidadeVitimas.vitimas.length });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das vítimas por intervalo de idade de um caso" });
    }
};

//GET QUANTIDADE DE CASOS POR STATUS
export const getQuantidadeCasosPorStatus = async (req, res) => {
    try {
        const quantidadeEmAndamento = await Caso.countDocuments({ status: 'Em andamento' });
        const quantidadeFinalizados = await Caso.countDocuments({ status: 'Finalizado' });
        const quantidadeArquivados = await Caso.countDocuments({ status: 'Arquivado' });

        res.status(200).json({
            quantidadeEmAndamento,
            quantidadeFinalizados,
            quantidadeArquivados
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas dos casos por status" });
    }
};

//GET QUANTIDADE DE CASOS DOS ÚLTIMOS MESES
export const getQuantidadeCasosUltimosMeses = async (req, res) => {
    try {
        const hoje = new Date();
        const meses = [];
        const nomesMeses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        // Criar array com os últimos 5 meses
        for (let i = 4; i >= 0; i--) {
            const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            const mesInicio = new Date(data.getFullYear(), data.getMonth(), 1);
            const mesFim = new Date(data.getFullYear(), data.getMonth() + 1, 0);

            const quantidade = await Caso.countDocuments({
                dataAbertura: {
                    $gte: mesInicio,
                    $lte: mesFim
                }
            });

            meses.push({
                mes: nomesMeses[data.getMonth()],
                quantidade: quantidade
            });
        }

        res.status(200).json({ meses });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas dos casos dos últimos meses" });
    }
};

//GET QUANTIDADE DE CASOS ATIVOS
export const getQuantidadeCasosAtivos = async (req, res) => {
    try {
        const quantidadeCasosAtivos = await Caso.countDocuments({ status: 'Em andamento' });
        res.status(200).json({ quantidadeCasosAtivos });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter quantidade de casos ativos" });
    }
};

//GET QUANTIDADE TOTAL DE EVIDÊNCIAS
export const getQuantidadeTotalEvidencias = async (req, res) => {
    try {
        const quantidadeTotalEvidencias = await Caso.aggregate([
            { $unwind: "$evidencias" },
            { $group: { _id: null, total: { $sum: 1 } } }
        ]);

        res.status(200).json({ 
            quantidadeTotalEvidencias: quantidadeTotalEvidencias.length > 0 ? quantidadeTotalEvidencias[0].total : 0 
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter quantidade total de evidências" });
    }
};

//GET QUANTIDADE TOTAL DE LAUDOS
export const getQuantidadeTotalLaudos = async (req, res) => {
    try {
        const quantidadeTotalLaudos = await Laudo.countDocuments();
        res.status(200).json({ quantidadeTotalLaudos });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter quantidade total de laudos" });
    }
};

//GET TODAS AS ESTATÍSTICAS DO DASHBOARD COM FILTROS DINÂMICOS
export const getAllDashboardStats = async (req, res) => {
    try {
        const {
            status,
            genero,
            etnia,
            mesInicial,
            mesFinal,
            anoInicial,
            anoFinal,
            idadeMin,
            idadeMax
        } = req.query;

        // Construir filtro base para casos
        let filtroCasos = {};
        
        // Filtro por status
        if (status) {
            filtroCasos.status = status;
        }

        // Filtro por período
        if (mesInicial && mesFinal && anoInicial && anoFinal) {
            const dataInicial = new Date(anoInicial, mesInicial - 1, 1);
            const dataFinal = new Date(anoFinal, mesFinal, 0);
            filtroCasos.dataAbertura = {
                $gte: dataInicial,
                $lte: dataFinal
            };
        }

        // Buscar casos com os filtros aplicados
        const casos = await Caso.find(filtroCasos).populate({
            path: 'vitimas',
            match: {
                ...(genero && { genero }),
                ...(etnia && { corEtnia: etnia }),
                ...(idadeMin && idadeMax && { idade: { $gte: parseInt(idadeMin), $lte: parseInt(idadeMax) } })
            }
        });

        // Calcular estatísticas com os filtros aplicados
        const quantidadeCasos = casos.length;
        const quantidadeCasosAtivos = casos.filter(caso => caso.status === 'Em andamento').length;
        const quantidadeCasosPorStatus = {
            emAndamento: casos.filter(caso => caso.status === 'Em andamento').length,
            finalizados: casos.filter(caso => caso.status === 'Finalizado').length,
            arquivados: casos.filter(caso => caso.status === 'Arquivado').length
        };

        // Estatísticas de evidências (apenas dos casos filtrados)
        const quantidadeTotalEvidencias = casos.reduce((total, caso) => total + (caso.evidencias?.length || 0), 0);

        // Estatísticas de laudos (apenas dos casos filtrados)
        const quantidadeTotalLaudos = await Laudo.countDocuments({
            caso: { $in: casos.map(caso => caso._id) }
        });

        // Estatísticas de vítimas com filtros aplicados
        let totalVitimas = 0;
        let vitimasPorGenero = { masculino: 0, feminino: 0 };
        let vitimasPorEtnia = { preto: 0, pardo: 0, indigena: 0, amarelo: 0 };
        let vitimasPorIdade = {};

        casos.forEach(caso => {
            caso.vitimas.forEach(vitima => {
                if (vitima) { // Verifica se a vítima passou nos filtros
                    totalVitimas++;
                    
                    // Contagem por gênero
                    if (vitima.genero === 'Masculino') vitimasPorGenero.masculino++;
                    if (vitima.genero === 'Feminino') vitimasPorGenero.feminino++;

                    // Contagem por etnia
                    if (vitima.corEtnia === 'preto') vitimasPorEtnia.preto++;
                    if (vitima.corEtnia === 'pardo') vitimasPorEtnia.pardo++;
                    if (vitima.corEtnia === 'indigena') vitimasPorEtnia.indigena++;
                    if (vitima.corEtnia === 'amarelo') vitimasPorEtnia.amarelo++;

                    // Contagem por idade
                    const idade = vitima.idade;
                    if (!vitimasPorIdade[idade]) {
                        vitimasPorIdade[idade] = 0;
                    }
                    vitimasPorIdade[idade]++;
                }
            });
        });

        // Estatísticas mensais com filtros aplicados
        const meses = [];
        const nomesMeses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        // Se não houver filtro de período, usa os últimos 5 meses
        const hoje = new Date();
        const mesInicialFiltro = mesInicial ? parseInt(mesInicial) - 1 : hoje.getMonth() - 4;
        const mesFinalFiltro = mesFinal ? parseInt(mesFinal) - 1 : hoje.getMonth();
        const anoInicialFiltro = anoInicial ? parseInt(anoInicial) : hoje.getFullYear();
        const anoFinalFiltro = anoFinal ? parseInt(anoFinal) : hoje.getFullYear();

        for (let ano = anoInicialFiltro; ano <= anoFinalFiltro; ano++) {
            const mesInicio = ano === anoInicialFiltro ? mesInicialFiltro : 0;
            const mesFim = ano === anoFinalFiltro ? mesFinalFiltro : 11;

            for (let mes = mesInicio; mes <= mesFim; mes++) {
                const dataInicio = new Date(ano, mes, 1);
                const dataFim = new Date(ano, mes + 1, 0);

                const quantidade = casos.filter(caso => {
                    const dataCaso = new Date(caso.dataAbertura);
                    return dataCaso >= dataInicio && dataCaso <= dataFim;
                }).length;

                meses.push({
                    mes: nomesMeses[mes],
                    ano: ano,
                    quantidade: quantidade
                });
            }
        }

        // Preparar resposta com os filtros aplicados
        const resposta = {
            filtrosAplicados: {
                status,
                genero,
                etnia,
                periodo: mesInicial && mesFinal ? {
                    mesInicial: parseInt(mesInicial),
                    mesFinal: parseInt(mesFinal),
                    anoInicial: parseInt(anoInicial),
                    anoFinal: parseInt(anoFinal)
                } : null,
                idade: idadeMin && idadeMax ? {
                    minima: parseInt(idadeMin),
                    maxima: parseInt(idadeMax)
                } : null
            },
            estatisticasGerais: {
                totalCasos: quantidadeCasos,
                casosAtivos: quantidadeCasosAtivos,
                casosPorStatus: quantidadeCasosPorStatus
            },
            estatisticasEvidencias: {
                totalEvidencias: quantidadeTotalEvidencias
            },
            estatisticasLaudos: {
                totalLaudos: quantidadeTotalLaudos
            },
            estatisticasVitimas: {
                totalVitimas,
                porGenero: vitimasPorGenero,
                porEtnia: vitimasPorEtnia,
                porIdade: vitimasPorIdade
            },
            casosPorMes: meses
        };

        res.status(200).json(resposta);
    } catch (err) {
        console.error('Erro ao obter estatísticas:', err);
        res.status(500).json({ error: "Erro ao obter estatísticas do dashboard" });
    }
};

