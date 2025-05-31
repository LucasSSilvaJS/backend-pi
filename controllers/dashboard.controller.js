import Caso from "../models/caso.model.js";

export const getQuantidadeCasos = async (req, res) => {
    try {
        const quantidadeCasos = await Caso.countDocuments();
        res.status(200).json({ quantidadeCasos });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas dos casos" });
    }
};

export const getQuantidadeEvidencias = async (req, res) => {
    try {
        const { id } = req.params;
        const quantidadeEvidencias = await Caso.findById(id, "evidencias").populate("evidencias");
        res.status(200).json({ quantidadeEvidencias: quantidadeEvidencias.evidencias.length });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das evidências" });
    }
};

export const getQuantidadeVitimas = async (req, res) => {
    try {
        const { id } = req.params;
        const quantidadeVitimas = await Caso.findById(id, "vitimas").populate("vitimas");
        res.status(200).json({ quantidadeVitimas: quantidadeVitimas.vitimas.length });
    } catch (err) {
        res.status(500).json({ error: "Erro ao obter estatísticas das vítimas" });
    }
};

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
