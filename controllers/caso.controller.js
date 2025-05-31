import Caso from '../models/caso.model.js';
import User from '../models/user.model.js';
import Evidencia from '../models/evidencia.model.js';
import Relatorio from '../models/relatorio.model.js';
import Vitima from '../models/vitima.model.js';

// Create a new caso
export const createCaso = async (req, res) => {
    try {
        const {
            userId,
            titulo,
            descricao,
            status,
            dataAbertura,
            dataFechamento
        } = req.body;

        const newCaso = new Caso({
            titulo,
            descricao,
            status,
            dataAbertura,
            dataFechamento,
            evidencias: [],
            relatorios: [],
            vitimas: []
        });

        const savedCaso = await newCaso.save();

        // Update the user with the new caso ID
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { casos: savedCaso._id } }, // Add caso ID to user's casos array if not already present
            { new: true }
        );

        res.status(201).json(savedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar caso' });
    }
};

// Get all casos
export const getAllCasos = async (req, res) => {
    try {
        const casos = await Caso.find().populate('evidencias relatorios vitimas');
        res.status(200).json(casos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter casos' });
    }
};

// Get a caso by id
export const getCasoById = async (req, res) => {
    try {
        const caso = await Caso.findById(req.params.id).populate('evidencias relatorios vitimas');
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(caso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter caso' });
    }
};

// Update a caso
export const updateCaso = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            status,
            dataAbertura,
            dataFechamento
        } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            req.params.id,
            {
                titulo,
                descricao,
                status,
                dataAbertura,
                dataFechamento
            },
            {
                new: true
            }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar caso' });
    }
};

// Delete a caso
export const deleteCaso = async (req, res) => {
    try {
        // Remove all relations from caso
        const casoRelations = await Caso.findById(req.params.id).populate('evidencias relatorios vitimas');

        if (casoRelations.evidencias?.length) {
            const evidenciaIds = casoRelations.evidencias.map(e => e._id);
            await Evidencia.deleteMany({ _id: { $in: evidenciaIds } });
        }

        if (casoRelations.relatorios?.length) {
            const relatorioIds = casoRelations.relatorios.map(r => r._id);
            await Relatorio.deleteMany({ _id: { $in: relatorioIds } });
        }

        if (casoRelations.vitimas?.length) {
            const vitimaIds = casoRelations.vitimas.map(v => v._id);
            await Vitima.deleteMany({ _id: { $in: vitimaIds } });
        }

        const { userId } = req.body;
        const deletedCaso = await Caso.findByIdAndDelete(req.params.id);
        if (!deletedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        // Update the user with the deleted caso ID
        await User.findByIdAndUpdate(
            userId,
            { $pull: { casos: deletedCaso._id } },
            { new: true }
        );

        res.status(200).json({ message: 'Caso deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar caso' });
    }
};

// Add an evidence ID to a caso
export const addEvidenciaToCaso = async (req, res) => {
    try {
        const { idCaso, idEvidencia } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $addToSet: { evidencias: idEvidencia } }, // Add to evidencias array if not already present
            { new: true }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar evidência ao caso' });
    }
};

// Remove an evidence ID from a caso
export const removeEvidenciaFromCaso = async (req, res) => {
    try {
        const { idCaso, idEvidencia } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $pull: { evidencias: idEvidencia } }, // Remove from evidencias array
            { new: true }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover evidência do caso' });
    }
};

// Add a report ID to a caso
export const addRelatorioToCaso = async (req, res) => {
    try {
        const { idCaso, idRelatorio } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $addToSet: { relatorios: idRelatorio } }, // Add to relatorios array if not already present
            { new: true }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar relatório ao caso' });
    }
};

// Remove a report ID from a caso
export const removeRelatorioFromCaso = async (req, res) => {
    try {
        const { idCaso, idRelatorio } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $pull: { relatorios: idRelatorio } }, // Remove from relatorios array
            { new: true }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover relatório do caso' });
    }
};

// Add a vitima ID to a caso
export const addVitimaToCaso = async (req, res) => {
    try {
        const { idCaso, idVitima } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $addToSet: { vitimas: idVitima } }, // Add to vitimas array if not already present
            { new: true }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar vitima ao caso' });
    }
};

// Remove a vitima ID from a caso
export const removeVitimaFromCaso = async (req, res) => {
    try {
        const { idCaso, idVitima, userId } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $pull: { vitimas: idVitima } }, // Remove from vitimas array
            { new: true }
        );
        if (!updatedCaso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(updatedCaso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover vitima do caso' });
    }
};
