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

