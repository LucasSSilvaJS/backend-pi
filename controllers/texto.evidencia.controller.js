import TextoEvidencia from '../models/texto.evidencia.model.js';
import Evidencia from '../models/evidencia.model.js';

export const getAllTextosEvidencia = async (req, res) => {
    try {
        const textosEvidencia = await TextoEvidencia.find().sort({ createdAt: -1 });
        res.status(200).json(textosEvidencia);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar textos de evidência" });
    }
};

export const getTextoEvidenciaById = async (req, res) => {
    try {
        const textoEvidencia = await TextoEvidencia.findById(req.params.id);
        if (!textoEvidencia) {
            return res.status(404).json({ error: "Texto de evidência não encontrado" });
        }
        res.status(200).json(textoEvidencia);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar texto de evidência" });
    }
};

export const createTextoEvidencia = async (req, res) => {
    try {
        const { conteudo, evidenciaId } = req.body;
        const textoEvidencia = await TextoEvidencia.create({ conteudo });
        await Evidencia.findByIdAndUpdate(evidenciaId, {
            $addToSet: { textos: textoEvidencia._id }
        });
        res.status(201).json({ message: "Texto de evidência criado com sucesso!", textoEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar texto de evidência" });
    }
};

export const updateTextoEvidencia = async (req, res) => {
    try {
        const { conteudo } = req.body;
        const textoEvidencia = await TextoEvidencia.findByIdAndUpdate(req.params.id, { conteudo }, { new: true });
        if (!textoEvidencia) {
            return res.status(404).json({ error: "Texto de evidência não encontrado" });
        }
        res.status(200).json({ message: "Texto de evidência atualizado com sucesso!", textoEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar texto de evidência" });
    }
};

export const deleteTextoEvidencia = async (req, res) => {
    try {
        const { evidenciaId } = req.body;
        await Evidencia.findByIdAndUpdate(evidenciaId, {
            $pull: { textos: req.params.id }
        });
        const textoEvidencia = await TextoEvidencia.findByIdAndRemove(req.params.id);
        if (!textoEvidencia) {
            return res.status(404).json({ error: "Texto de evidência não encontrado" });
        }
        res.status(200).json({ message: "Texto de evidência deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar texto de evidência" });
    }
};
