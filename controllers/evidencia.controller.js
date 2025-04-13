import { uploadToCloudinary } from "../utils/upload.cloudinary.js";
import Evidencia from "../models/evidencia.model.js";

export const createEvidencia = async (req, res) => {
    try {
        const {
            tipo,
            dataColeta,
            status,
            coletadaPor,
            urlEvidencia,
            laudo
        } = req.body;

        const novaEvidencia = new Evidencia({
            tipo,
            dataColeta,
            status,
            coletadaPor,
            urlEvidencia,
            laudo
        });

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map((file) =>
                uploadToCloudinary(file)
            );
            const imagensUrls = await Promise.all(uploadPromises);
            novaEvidencia.urlEvidencia = imagensUrls;
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
        const evidencias = await Evidencia.find().populate('laudo');
        res.status(200).json(evidencias);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar evidências' });
    }
};

export const getEvidenciaById = async (req, res) => {
    try {
        const evidencia = await Evidencia.findById(req.params.id).populate('laudo');
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

        if (updateData.urlEvidencia) {
            const uploadPromises = updateData.urlEvidencia.map((url) =>
                uploadToCloudinary(url)
            );
            const imagensUrls = await Promise.all(uploadPromises);
            updateData.urlEvidencia = imagensUrls;
        }

        const evidenciaAtualizada = await Evidencia.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

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

        res.status(200).json({ message: 'Evidência deletada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar evidência' });
    }
};

export const addLaudoToEvidencia = async (req, res) => {
    try {
        const { idEvidencia, idLaudo } = req.body;

        if (!idLaudo || !idEvidencia) {
            return res.status(400).json({ error: 'idLaudo e idEvidencia são obrigatórios' });
        }

        const evidencia = await Evidencia.findByIdAndUpdate(
            idEvidencia,
            { laudo: idLaudo },
            { new: true }
        );

        if (!evidencia) {
            return res.status(404).json({ error: 'Evidência não encontrada' });
        }

        res.status(200).json({
            message: 'Evidência atualizada com sucesso!',
            evidencia
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao preencher laudoId da evidência' });
    }
};