import Odontograma from '../models/odontograma.model.js';

export const getAllOdontogramas = async (req, res) => {
    try {
        const odontogramas = await Odontograma.find();
        res.status(200).json(odontogramas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar odontogramas' });
    }
};

export const getOdontogramaById = async (req, res) => {
    try {
        const { id } = req.params;
        const odontograma = await Odontograma.findById(id);
        if (!odontograma) {
            return res.status(404).json({ error: 'Odontograma nao encontrado' });
        }
        res.status(200).json(odontograma);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar odontograma' });
    }
};

export const createOdontograma = async (req, res) => {
    try {
        const { numero, observacao } = req.body;
        const odontograma = await Odontograma.create({ numero, observacao });
        res.status(201).json(odontograma);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar odontograma' });
    }
};

export const updateOdontogramaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero, observacao } = req.body;
        const odontograma = await Odontograma.findByIdAndUpdate(id, { numero, observacao }, { new: true });
        if (!odontograma) {
            return res.status(404).json({ error: 'Odontograma nao encontrado' });
        }
        res.status(200).json(odontograma);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar odontograma' });
    }
};

export const deleteOdontogramaById = async (req, res) => {
    try {
        const { id } = req.params;
        const odontograma = await Odontograma.findByIdAndDelete(id);
        if (!odontograma) {
            return res.status(404).json({ error: 'Odontograma nao encontrado' });
        }
        res.status(200).json({ message: 'Odontograma deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar odontograma' });
    }
};
