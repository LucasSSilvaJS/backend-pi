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
        const { textoId } = req.params;
        const textoEvidencia = await TextoEvidencia.findById(textoId);
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
        const { evidenciaId } = req.params;
        const { conteudo } = req.body;
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
        const { textoId } = req.params;
        const { conteudo } = req.body;
        const textoEvidencia = await TextoEvidencia.findByIdAndUpdate(textoId, { conteudo }, { new: true });
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
        const { evidenciaId, textoId } = req.params;

        // Verifica se a evidência existe
        const evidencia = await Evidencia.findById(evidenciaId);
        if (!evidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        // Verifica se o texto existe
        const textoEvidencia = await TextoEvidencia.findById(textoId);
        if (!textoEvidencia) {
            return res.status(404).json({ error: "Texto de evidência não encontrado" });
        }

        // Remove o ID do texto da lista de textos da evidência
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(evidenciaId, {
            $pull: { textos: textoId }
        }, { new: true });

        // Deleta o texto do banco de dados
        await TextoEvidencia.findByIdAndDelete(textoId);

        res.status(200).json({ 
            message: "Texto de evidência deletado com sucesso!",
            evidencia: updatedEvidencia
        });
    } catch (error) {
        console.error('Erro ao deletar texto de evidência:', error);
        res.status(500).json({ error: "Erro ao deletar texto de evidência" });
    }
};
