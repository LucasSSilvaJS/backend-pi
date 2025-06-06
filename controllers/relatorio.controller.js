import Relatorio from '../models/relatorio.model.js';
import User from '../models/user.model.js';
import Caso from '../models/caso.model.js';

export const createRelatorio = async (req, res) => {
    try {
        const { titulo, conteudo, peritoResponsavel, userId, casoId } = req.body;

        // Verifica se o caso já tem um relatório
        const caso = await Caso.findById(casoId);
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        if (caso.relatorio) {
            return res.status(400).json({ error: 'Este caso já possui um relatório. Atualize o relatório existente ou remova-o primeiro.' });
        }

        const relatorio = new Relatorio({
            titulo,
            conteudo,
            peritoResponsavel
        });
        const createdRelatorio = await relatorio.save();

        // Atualiza o usuário com o novo relatório
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { relatorios: createdRelatorio._id } },
            { new: true }
        );

        // Atualiza o caso com o novo relatório
        await Caso.findByIdAndUpdate(
            casoId,
            { relatorio: createdRelatorio._id },
            { new: true }
        );

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
        const { userId, casoId } = req.body;
        const relatorio = await Relatorio.findByIdAndDelete(req.params.id);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }

        // Remove o relatório do usuário
        await User.findByIdAndUpdate(
            userId,
            { $pull: { relatorios: relatorio._id } },
            { new: true }
        );

        // Remove o relatório do caso
        await Caso.findByIdAndUpdate(
            casoId,
            { $unset: { relatorio: 1 } },
            { new: true }
        );

        res.status(200).json({ message: 'Relatório deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar relatório' });
    }
};
