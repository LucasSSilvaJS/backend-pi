import Caso from "../models/caso.model.js";
import Laudo from "../models/relatorio.model.js";

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
            localizacao,
            laudo
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
            localizacao,
            laudo
        });

        await novoCaso.save();

        const casoPopulado = await Caso.findById(novoCaso._id)
            .populate('paciente')
            .populate('evidencia')
            .populate('laudo');

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
        const { status, dataAbertura, titulo } = req.query;
        const query = {};

        if (status) {
            query.status = status;
        }

        if (dataAbertura) {
            query.dataAbertura = dataAbertura;
        }
        
        //busca por titulo sem precisar ser exata
        if (titulo){
            query.titulo = new RegExp(titulo, 'i');
        }

        const casos = await Caso.find(query)
            .populate('paciente')
            .populate('evidencia')
            .populate('laudo')
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
            .populate('evidencia')
            .populate('laudo');
            
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

        const caso = await Caso.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('paciente')
        .populate('evidencia')
        .populate('laudo');

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
        .populate('evidencia')
        .populate('laudo');

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
        .populate('evidencia')
        .populate('laudo');

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

export const addLaudoToCaso = async (req, res) => {
    try {
        const { idCaso, idLaudo } = req.body;

        if (!idCaso || !idLaudo) {
            return res.status(400).json({ error: 'idCaso e idLaudo são obrigatórios' });
        }

        const casoAtualizado = await Caso.findByIdAndUpdate(
            idCaso,
            { laudo: idLaudo },
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('paciente')
        .populate('evidencia')
        .populate('laudo');

        if (!casoAtualizado) {
            return res.status(404).json({ error: 'Caso não encontrado' });
        }

        res.status(200).json({
            message: 'Laudo adicionado ao caso com sucesso!',
            caso: casoAtualizado
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar laudo ao caso' });
    }
};
