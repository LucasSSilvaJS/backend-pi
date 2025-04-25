import Caso from "../models/caso.model.js";

export const createCaso = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            status,
            dataAbertura,
            dataFechamento,
            dataOcorrencia,
            paciente,
            evidencia,
            localizacao
        } = req.body;

        const novoCaso = new Caso({
            titulo,
            descricao,
            status: status || 'Em andamento',
            dataAbertura: dataAbertura || new Date(),
            dataFechamento,
            dataOcorrencia,
            paciente,
            evidencia,
            localizacao
        });

        await novoCaso.save();

        const casoPopulado = await Caso.findById(novoCaso._id)
            .populate('paciente')
            .populate('evidencia');

        res.status(201).json({
            message: 'Caso criado com sucesso!',
            caso: casoPopulado
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Dados inválidos',
                detalhes: Object.values(err.errors).map(e => e.message)
            });
        }
        res.status(500).json({ error: 'Erro ao criar caso' });
    }
};

export const getAllCasos = async (req, res) => {
    try {
        const { status, dataAbertura } = req.query;
        const query = {};

        if (status) {
            query.status = status;
        }

        if (dataAbertura) {
            query.dataAbertura = dataAbertura;
        }

        const casos = await Caso.find(query)
            .populate('paciente')
            .populate('evidencia')
            .sort({ createdAt: -1 });

        res.status(200).json(casos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar casos' });
    }
};

export const getCasoById = async (req, res) => {
    try {
        const caso = await Caso.findById(req.params.id)
            .populate('paciente')
            .populate('evidencia');
            
        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }
        res.status(200).json(caso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar caso' });
    }
};

export const updateCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Se estiver atualizando o status para 'Finalizado', adiciona a data de fechamento
        if (updateData.status === 'Finalizado' && !updateData.dataFechamento) {
            updateData.dataFechamento = new Date();
        }

        const caso = await Caso.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('paciente')
        .populate('evidencia');

        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        res.status(200).json({
            message: 'Caso atualizado com sucesso!',
            caso
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Dados inválidos',
                detalhes: Object.values(err.errors).map(e => e.message)
            });
        }
        res.status(500).json({ error: 'Erro ao atualizar caso' });
    }
};

export const deleteCaso = async (req, res) => {
    try {
        const { id } = req.params;

        const caso = await Caso.findByIdAndDelete(id);

        if (!caso) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        res.status(200).json({ message: 'Caso deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar caso' });
    }
};

export const addPacienteToCaso = async (req, res) => {
    try {
        const { idCaso, idPaciente } = req.body;

        if (!idCaso || !idPaciente) {
            return res.status(400).json({ error: 'idCaso e idPaciente são obrigatórios' });
        }

        const casoAtualizado = await Caso.findByIdAndUpdate(
            idCaso,
            { paciente: idPaciente },
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('paciente')
        .populate('evidencia');

        if (!casoAtualizado) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        res.status(200).json({
            message: 'Paciente adicionado ao caso com sucesso!',
            caso: casoAtualizado
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar paciente ao caso' });
    }
};

export const addEvidenciaToCaso = async (req, res) => {
    try {
        const { idCaso, idEvidencia } = req.body;

        if (!idCaso || !idEvidencia) {
            return res.status(400).json({ error: 'idCaso e idEvidencia são obrigatórios' });
        }

        const casoAtualizado = await Caso.findByIdAndUpdate(
            idCaso,
            { evidencia: idEvidencia },
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('paciente')
        .populate('evidencia');

        if (!casoAtualizado) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        res.status(200).json({
            message: 'Evidência adicionada ao caso com sucesso!',
            caso: casoAtualizado
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar evidência ao caso' });
    }
};