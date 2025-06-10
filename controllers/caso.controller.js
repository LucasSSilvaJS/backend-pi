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
            dataFechamento,
            geolocalizacao
        } = req.body;

        const newCaso = new Caso({
            titulo,
            descricao,
            status,
            dataAbertura,
            dataFechamento,
            geolocalizacao,
            evidencias: [],
            vitimas: []
        });

        const savedCaso = await newCaso.save();

        // Update the user with the new caso ID
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { casos: savedCaso._id } },
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
        const casos = await Caso.find()
            .populate('evidencias relatorio vitimas')
            .sort({ createdAt: -1 });
        res.status(200).json(casos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter casos' });
    }
};

// Get a caso by id
export const getCasoById = async (req, res) => {
    try {
        const caso = await Caso.findById(req.params.id).populate('evidencias relatorio vitimas');
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
            dataFechamento,
            geolocalizacao
        } = req.body;
        const updatedCaso = await Caso.findByIdAndUpdate(
            req.params.id,
            {
                titulo,
                descricao,
                status,
                dataAbertura,
                dataFechamento,
                geolocalizacao
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
        const casoRelations = await Caso.findById(req.params.id).populate('evidencias relatorio vitimas');

        if (casoRelations.evidencias?.length) {
            const evidenciaIds = casoRelations.evidencias.map(e => e._id);
            await Evidencia.deleteMany({ _id: { $in: evidenciaIds } });
        }

        if (casoRelations.relatorio) {
            await Relatorio.findByIdAndDelete(casoRelations.relatorio._id);
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

// Add a report to a caso
export const addRelatorioToCaso = async (req, res) => {
    try {
        const { idCaso, idRelatorio } = req.body;
        
        // Verifica se o caso existe
        const caso = await Caso.findById(idCaso);
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        // Verifica se o caso já tem um relatório
        if (caso.relatorio) {
            return res.status(400).json({ 
                error: 'Este caso já possui um relatório. Para atualizar, remova o relatório existente primeiro.' 
            });
        }

        // Verifica se o relatório existe
        const relatorio = await Relatorio.findById(idRelatorio);
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado' });
        }

        // Atualiza o caso com o novo relatório
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { relatorio: idRelatorio },
            { new: true }
        ).populate('relatorio');
        
        res.status(200).json(updatedCaso);
    } catch (error) {
        console.error('Erro ao adicionar relatório:', error);
        res.status(500).json({ error: 'Erro ao adicionar relatório ao caso' });
    }
};

// Remove a report from a caso
export const removeRelatorioFromCaso = async (req, res) => {
    try {
        const { idCaso, idRelatorio } = req.body;
        
        // Verifica se o caso existe
        const caso = await Caso.findById(idCaso);
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        // Verifica se o caso tem o relatório especificado
        if (!caso.relatorio || caso.relatorio.toString() !== idRelatorio) {
            return res.status(400).json({ error: 'Este caso não possui o relatório especificado' });
        }

        // Remove o relatório do caso
        const updatedCaso = await Caso.findByIdAndUpdate(
            idCaso,
            { $unset: { relatorio: 1 } },
            { new: true }
        );
        
        // Remove o relatório do banco de dados
        await Relatorio.findByIdAndDelete(idRelatorio);
        
        res.status(200).json(updatedCaso);
    } catch (error) {
        console.error('Erro ao remover relatório:', error);
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
