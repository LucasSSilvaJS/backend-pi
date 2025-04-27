import { uploadToCloudinary } from "../utils/upload.cloudinary.js";
import Evidencia from "../models/evidencia.model.js";
import Caso from "../models/caso.model.js";

export const createEvidencia = async (req, res) => {
    try {
        const {
            tipo,
            dataColeta,
            status,
            coletadaPor,
            caso
        } = req.body;

        const evidenciaData = {
            tipo,
            dataColeta,
            status: status || 'Em análise',
            coletadaPor,
        };

        if (caso) {
            evidenciaData.caso = caso;
        }

        const novaEvidencia = new Evidencia(evidenciaData);

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map((file) =>
                uploadToCloudinary(file)
            );
            const imagensUrls = await Promise.all(uploadPromises);
            novaEvidencia.urlEvidencia = imagensUrls;
        } else {
            return res.status(400).json({ error: 'É necessário enviar pelo menos uma evidência' });
        }

        await novaEvidencia.save();

        res.status(201).json({
            message: 'Evidência criada com sucesso!',
            evidencia: novaEvidencia
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar evidência' });
    }
};

export const getAllEvidencias = async (req, res) => {
    try {
        const evidencias = await Evidencia.find()
            .populate('caso')
            .populate('coletadaPor', 'username cargo');
        res.status(200).json(evidencias);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar evidências' });
    }
};

export const getEvidenciaById = async (req, res) => {
    try {
        const evidencia = await Evidencia.findById(req.params.id)
            .populate('caso')
            .populate('coletadaPor', 'username cargo');
            
        if (!evidencia) {
            return res.status(404).json({ error: 'Evidência não encontrada' });
        }
        res.status(200).json(evidencia);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar evidência' });
    }
};

export const updateEvidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map((file) =>
                uploadToCloudinary(file)
            );
            const imagensUrls = await Promise.all(uploadPromises);
            updateData.urlEvidencia = imagensUrls;
        }

        const evidenciaAtualizada = await Evidencia.findByIdAndUpdate(
            id, 
            updateData, 
            {
                new: true,
                runValidators: true
            }
        )
        .populate('caso')
        .populate('coletadaPor', 'username cargo');

        if (!evidenciaAtualizada) {
            return res.status(404).json({ error: 'Evidência não encontrada' });
        }

        res.status(200).json({
            message: 'Evidência atualizada com sucesso!',
            evidencia: evidenciaAtualizada
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar evidência' });
    }
};

export const deleteEvidencia = async (req, res) => {
    try {
        const { id } = req.params;

        const evidenciaDeletada = await Evidencia.findByIdAndDelete(id);

        if (!evidenciaDeletada) {
            return res.status(404).json({ error: 'Evidência não encontrada' });
        }

        await Caso.updateMany(
            { evidencia: id }, // Caso tenha a evidência no campo 'evidencia'
            { $set: { evidencia: null } } // Limpar a referência da evidência
        );

        res.status(200).json({ message: 'Evidência deletada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar evidência' });
    }
};

export const addCasoToEvidencia = async (req, res) => {
    try {
        const { idEvidencia, idCaso } = req.body;

        if (!idCaso || !idEvidencia) {
            return res.status(400).json({ error: 'idCaso e idEvidencia são obrigatórios' });
        }

        const evidencia = await Evidencia.findByIdAndUpdate(
            idEvidencia,
            { caso: idCaso },
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('caso')
        .populate('coletadaPor', 'username cargo');

        if (!evidencia) {
            return res.status(404).json({ error: 'Evidência não encontrada' });
        }

        res.status(200).json({
            message: 'Evidência atualizada com sucesso!',
            evidencia
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar caso à evidência' });
    }
};