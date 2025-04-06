import Laudo from "../models/laudo.model.js";

// Controller to create a new Laudo
export const createLaudo = async (req, res) => {
    try {
        const {
            titulo,
            peritoResponsavel,
            parecer,
            detalhamento,
            conclusao
        } = req.body;

        const novoLaudo = new Laudo({
            titulo,
            peritoResponsavel,
            parecer,
            detalhamento,
            conclusao
        });

        await novoLaudo.save();
        res.status(201).json({ message: 'Laudo criado com sucesso!', laudo: novoLaudo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar laudo' });
    }
};

// Controller to get all Laudos
export const getAllLaudos = async (req, res) => {
    try {
        const laudos = await Laudo.find().populate('parecer.caso parecer.evidencia parecer.paciente');
        res.status(200).json(laudos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar laudos' });
    }
};

// Controller to get a Laudo by ID
export const getLaudoById = async (req, res) => {
    try {
        const laudo = await Laudo.findById(req.params.id).populate('parecer.caso parecer.evidencia parecer.paciente');
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json(laudo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter laudo' });
    }
};

// Controller to update a Laudo
export const updateLaudo = async (req, res) => {
    try {
        const laudo = await Laudo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Laudo atualizado com sucesso!', laudo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar laudo' });
    }
};

// Controller to delete a Laudo
export const deleteLaudo = async (req, res) => {
    try {
        const laudo = await Laudo.findByIdAndDelete(req.params.id);
        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Laudo deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar laudo' });
    }
};

