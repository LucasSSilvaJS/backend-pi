import Laudo from '../models/laudo.model.js';

export const createLaudo = async (req, res) => {
    try {
        const { descricao, conclusao, peritoResponsavel, evidenciaId } = req.body;
        const laudo = new Laudo({ descricao, conclusao, peritoResponsavel });
        await laudo.save();

        const evidencia = await Evidencia.findByIdAndUpdate(evidenciaId, { $set: { laudo: laudo._id } }, { new: true });
        
        if (!evidencia) {
            return res.status(404).json({ error: 'Evidência n o encontrada' });
        }

        res.status(201).json({ message: 'Laudo criado com sucesso!', laudo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar laudo' });
    }
};

export const getAllLaudos = async (req, res) => {
    try {
        const laudos = await Laudo.find().populate('peritoResponsavel');
        res.status(200).json(laudos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter laudos' });
    }
};

export const getLaudoById = async (req, res) => {
    try {
        const { id } = req.params;
        const laudo = await Laudo.findById(id).populate('peritoResponsavel');
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json(laudo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter laudo' });
    }
};

export const updateLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, conclusao, peritoResponsavel } = req.body;
        const laudo = await Laudo.findByIdAndUpdate(id, { descricao, conclusao, peritoResponsavel }, { new: true });
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Laudo atualizado com sucesso!', laudo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar laudo' });
    }
};

export const deleteLaudo = async (req, res) => {
    try {
        const { evidenciaId } = req.body;
        const { id } = req.params;
        const laudo = await Laudo.findByIdAndRemove(id);
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }

        await Evidencia.findByIdAndUpdate(evidenciaId, { $set: { laudo: null } });

        res.status(200).json({ message: 'Laudo deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar laudo' });
    }
};
