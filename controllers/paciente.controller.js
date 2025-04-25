import Paciente from "../models/paciente.model.js";

export const createPaciente = async (req, res) => {
    try {
        const { nome, cpf, rg, status, caso } = req.body;

        // Verifica se já existe um paciente com o mesmo CPF ou RG
        if (cpf) {
            const pacienteExistente = await Paciente.findOne({ cpf });
            if (pacienteExistente) {
                return res.status(400).json({ error: 'Já existe um paciente com este CPF' });
            }
        }

        if (rg) {
            const pacienteExistente = await Paciente.findOne({ rg });
            if (pacienteExistente) {
                return res.status(400).json({ error: 'Já existe um paciente com este RG' });
            }
        }

        const novoPaciente = new Paciente({ 
            nome, 
            cpf, 
            rg, 
            status, 
            caso 
        });

        await novoPaciente.save();

        const pacientePopulado = await Paciente.findById(novoPaciente._id)
            .populate('caso');

        res.status(201).json({
            message: 'Paciente criado com sucesso!',
            paciente: pacientePopulado
        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'CPF ou RG já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao criar paciente' });
    }
};

export const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find()
            .populate('caso')
            .sort({ createdAt: -1 });
        res.status(200).json(pacientes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
};

export const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id)
            .populate('caso');
            
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
        const { id } = req.params;
        const updateData = req.body;

        // Verifica se está tentando atualizar CPF ou RG
        if (updateData.cpf || updateData.rg) {
            const pacienteExistente = await Paciente.findOne({
                $or: [
                    { cpf: updateData.cpf },
                    { rg: updateData.rg }
                ],
                _id: { $ne: id }
            });

            if (pacienteExistente) {
                return res.status(400).json({ 
                    error: 'Já existe um paciente com este CPF ou RG' 
                });
            }
        }

        const paciente = await Paciente.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true,
                runValidators: true
            }
        ).populate('caso');

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }

        res.status(200).json({
            message: 'Paciente atualizado com sucesso!',
            paciente
        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'CPF ou RG já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;

        const paciente = await Paciente.findByIdAndDelete(id);

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }

        res.status(200).json({ message: 'Paciente deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
};

export const addCasoToPaciente = async (req, res) => {
    try {
        const { idCaso, idPaciente } = req.body;

        if (!idCaso || !idPaciente) {
            return res.status(400).json({ error: 'idCaso e idPaciente são obrigatórios' });
        }

        const paciente = await Paciente.findByIdAndUpdate(
            idPaciente,
            { caso: idCaso },
            { 
                new: true,
                runValidators: true
            }
        ).populate('caso');

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        
        res.status(200).json({
            message: 'Caso adicionado ao paciente com sucesso!',
            paciente
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar caso ao paciente' });
    }
};