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

// Controller to add relationship between Laudo and User
export const addPeritoToLaudo = async (req, res) => {
    try {
        const { idLaudo, idPerito } = req.body;

        if (!idLaudo || !idPerito) {
            return res.status(400).json({ error: 'idLaudo e idPerito são obrigatórios' });
        }

        const laudo = await Laudo.findByIdAndUpdate(
            idLaudo,
            { peritoResponsavel: idPerito },
            { new: true }
        );

        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Perito adicionado ao laudo com sucesso!', laudo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar perito ao laudo' });
    }
};

// Controller to add relationship between Laudo and Relatorio
export const addEvidenciaToLaudo = async (req, res) => {
    try {
        const { idLaudo, idEvidencia } = req.body;

        if (!idLaudo || !idEvidencia) {
            return res.status(400).json({ error: 'idLaudo e idRelatorio são obrigatórios' });
        }

        const laudo = await Laudo.findByIdAndUpdate(
            idLaudo,
            { parecer: { evidencia: idEvidencia} },
            { new: true }
        );

        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Evidencia adicionada ao laudo com sucesso!', laudo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar evidencia ao laudo' });
    }
};

// Controller to add relationship between Laudo and Caso
export const addCasoToLaudo = async (req, res) => {
    try {
        const { idLaudo, idCaso } = req.body;

        if (!idLaudo || !idCaso) {
            return res.status(400).json({ error: 'idLaudo e idCaso são obrigatórios' });
        }

        const laudo = await Laudo.findByIdAndUpdate(
            idLaudo,
            { parecer: { caso: idCaso } },
            { new: true }
        );

        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Caso adicionado ao laudo com sucesso!', laudo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar caso ao laudo' });
    }
};

// Controller to add relationship between Laudo and Paciente
export const addPacienteToLaudo = async (req, res) => {
    try {
        const { idLaudo, idPaciente } = req.body;

        if (!idLaudo || !idPaciente) {
            return res.status(400).json({ error: 'idLaudo e idPaciente são obrigatórios' });
        }

        const laudo = await Laudo.findByIdAndUpdate(
            idLaudo,
            { parecer: { paciente: idPaciente } },
            { new: true }
        );

        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }
        res.status(200).json({ message: 'Paciente adicionado ao laudo com sucesso!', laudo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar paciente ao laudo' });
    }
};