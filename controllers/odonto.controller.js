import Odonto from "../models/odonto.model.js"

export const createOdonto = async (req, res) => {
    try {
        const { nome, cro } = req.body;

        const novoOdontolegista = new Odonto({ nome, cro });
        await novoOdontolegista.save();

        res.status(201).json({
            message: 'Odontolegista criado com sucesso!',
            odonto: novoOdontolegista
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar odontolegista' });
    }
}

export const getAllOdontos = async (req, res) => {
    try {
        const odonlolegistas = await Odonto.find();
        res.status(200).json(odonlolegistas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar odontolegistas' });
    }
};

export const getOdontoById = async (req, res) => {
    try {
        const odontolegista = await Odonto.findById(req.params.id);
        if (!odontolegista) {
            return res.status(404).json({ error: 'Odontolegista não encontrado' });
        }
        res.status(200).json(odontolegista);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter odontolegista' });
    }
};

export const updateOdonto = async (req, res) => {
    try {
        const odontolegista = await Odonto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!odontolegista) {
            return res.status(404).json({ error: 'Odontolegista não encontrado' });
        }
        res.status(200).json({
            message: 'Odontolegista atualizado com sucesso!',
            odontolegista
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar odontolegista' });
    }
};

export const deleteOdonto = async (req, res) => {
    try {
        const odontolegista = await Odonto.findByIdAndDelete(req.params.id);
        if (!odontolegista) {
            return res.status(404).json({ error: 'Odontolegista não encontrado' });
        }
        res.status(200).json({ message: 'Odontolegista deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar odontolegista' });
    }
};