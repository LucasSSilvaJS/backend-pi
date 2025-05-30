import Relatorio from '../models/relatorio.model.js';

export const createRelatorio = async (req, res) => {
    try {
        const { titulo, conteudo, peritoResponsavel } = req.body;
        const relatorio = new Relatorio({
            titulo,
            conteudo,
            peritoResponsavel
        });
        const createdRelatorio = await relatorio.save();
        res.status(201).json(createdRelatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar relatório' });
    }
};

export const getAllRelatorios = async (req, res) => {
    try {
        const relatorios = await Relatorio.find().populate('peritoResponsavel');
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatórios' });
    }
};

export const getRelatorioById = async (req, res) => {
    try {
        const relatorio = await Relatorio.findById(req.params.id).populate('peritoResponsavel');
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatório por ID' });
    }
};

export const updateRelatorio = async (req, res) => {
    try {
        const { titulo, conteudo, peritoResponsavel } = req.body;
        const relatorio = await Relatorio.findByIdAndUpdate(
            req.params.id,
            { titulo, conteudo, peritoResponsavel },
            { new: true }
        );
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar relatório' });
    }
};

export const deleteRelatorio = async (req, res) => {
    try {
        const relatorio = await Relatorio.findByIdAndDelete(req.params.id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }
        res.status(200).json({ message: 'Relatório deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar relatório' });
    }
};
