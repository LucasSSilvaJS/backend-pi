import Evidencia from "../models/evidencia.model.js";

export const createEvidencia = async (req, res) => {
    const { tipo, dataColeta, status, coletadaPor } = req.body;

    try {
        const newEvidencia = new Evidencia({
            tipo,
            dataColeta,
            status,
            coletadaPor,
            imagens: [],
            textos: [],
            geolocalizacoes: [],
            laudo: null
        });

        const savedEvidencia = await newEvidencia.save();

        res.status(201).json({ message: "Evidência criada com sucesso!", evidencia: savedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar evidência" });
    }
};

export const getAllEvidencias = async (req, res) => {
    try {
        const evidencias = await Evidencia.find().populate('coletadaPor').populate('imagens').populate('textos').populate('geolocalizacoes').populate('laudo');

        res.status(200).json(evidencias);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar evidências" });
    }
};

export const getEvidenciaById = async (req, res) => {
    const { id } = req.params;

    try {
        const evidencia = await Evidencia.findById(id).populate('coletadaPor').populate('imagens').populate('textos').populate('geolocalizacoes').populate('laudo');

        if (!evidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json(evidencia);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar evidência" });
    }
};

export const updateEvidencia = async (req, res) => {
    const { id } = req.params;
    const { tipo, dataColeta, status, coletadaPor } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            tipo,
            dataColeta,
            status,
            coletadaPor
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Evidência atualizada com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar evidência" });
    }
};

export const deleteEvidencia = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvidencia = await Evidencia.findByIdAndDelete(id);

        if (!deletedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Evidência deletada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar evidência" });
    }
};

export const addImagemToEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idImagem } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $addToSet: { imagens: idImagem }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Imagem adicionada à evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar imagem à evidência" });
    }
};

export const removeImagemFromEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idImagem } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $pull: { imagens: idImagem }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Imagem removida da evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover imagem da evidência" });
    }
};

export const addTextoToEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idTexto } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $addToSet: { textos: idTexto }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Texto adicionado à evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar texto à evidência" });
    }
};

export const removeTextoFromEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idTexto } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $pull: { textos: idTexto }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Texto removido da evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover texto da evidência" });
    }
};

export const addGeolocalizacaoToEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idGeolocalizacao } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $addToSet: { geolocalizacoes: idGeolocalizacao }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Geolocalização adicionada à evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar geolocalização à evidência" });
    }
};

export const removeGeolocalizacaoFromEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idGeolocalizacao } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $pull: { geolocalizacoes: idGeolocalizacao }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Geolocalização removida da evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover geolocalização da evidência" });
    }
};
