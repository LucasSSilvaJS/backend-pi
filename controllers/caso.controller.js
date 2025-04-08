import Caso from "../models/caso.model.js"

export const createCaso = async (req, res) => {
    const {
        titulo,
        descricao,
        status,
        dataAbertura,
        dataFechamento,
        dataOcorrencia,
        paciente,
        localizacao
    } = req.body;

    const novoCaso = new Caso({
        titulo,
        descricao,
        status,
        dataAbertura,
        dataFechamento,
        dataOcorrencia,
        paciente,
        localizacao
    });

    try {
        await novoCaso.save();
        res.status(201).json({
            message: 'Caso criado com sucesso!',
            caso: novoCaso
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar caso' });
    }
};
export const getAllCasos = async (req, res) => {
    const { status, dataAbertura } = req.query;
    const query = {};

    if (status) {
        query.status = status;
    }

    if (dataAbertura) {
        query.dataAbertura = dataAbertura;
    }

    try {
        const casos = await Caso.find(query).populate('paciente');
        res.status(200).json(casos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao filtrar casos' });
    }
};

export const getCasoById = async (req, res) => {
    try {
        const caso = await Caso.findById(req.params.id).populate('paciente');
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(caso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter caso' });
    }
};

export const updateCaso = async (req, res) => {
    try {
        const caso = await Caso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json({
            message: 'Caso atualizado com sucesso!',
            caso
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar caso' });
    }
};

export const deleteCaso = async (req, res) => {
    try {
        const caso = await Caso.findByIdAndDelete(req.params.id);
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json({ message: 'Caso deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar caso' });
    }
};