import Paciente from "../models/paciente.model.js"

export const createPaciente = async (req, res) => {
    try {
        const { nome, cpf, rg } = req.body;

        const novoPaciente = new Paciente({ nome, cpf, rg });
        await novoPaciente.save();

        res.status(201).json({
            message: 'Paciente criado com sucesso!',
            paciente: novoPaciente
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar paciente' });
    }
}

export const getAllPacientes = async (req, res) => {
    try {
        const paciente = await Paciente.find();
        res.status(200).json(paciente);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
};

export const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        res.status(200).json(paciente);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter paciente' });
    }
};

export const updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        res.status(200).json({
            message: 'Paciente atualizado com sucesso!',
            paciente
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        res.status(200).json({ message: 'Paciente deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
};