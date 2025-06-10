import Evidencia from "../models/evidencia.model.js";
import User from "../models/user.model.js";
import ImagemEvidencia from "../models/imagem.evidencia.model.js";
import TextoEvidencia from "../models/texto.evidencia.model.js";
import Laudo from "../models/laudo.model.js";
import Caso from "../models/caso.model.js";

export const createEvidencia = async (req, res) => {
    const { tipo, dataColeta, status, coletadaPor, latitude, longitude, casoId } = req.body;

    try {
        const newEvidencia = new Evidencia({
            tipo,
            dataColeta,
            status,
            coletadaPor,
            imagens: [],
            textos: [],
            geolocalizacao:{
                latitude,
                longitude
            },
            laudo: null
        });

        const savedEvidencia = await newEvidencia.save();

        // Update the user with the new caso ID
        await User.findByIdAndUpdate(
            coletadaPor,
            { $addToSet: { evidencias: savedEvidencia._id } }, // Add caso ID to user's casos array if not already present
            { new: true }
        );

        // Adiciona o id da evidência na lista de evidências em casos
        await Caso.findByIdAndUpdate(
            casoId,
            { $addToSet: { evidencias: savedEvidencia._id } },
            { new: true }
        );
        
        res.status(201).json({ message: "Evidência criada com sucesso!", evidencia: savedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar evidência" });
    }
};

export const getAllEvidencias = async (req, res) => {
    try {
        const evidencias = await Evidencia.find().populate('coletadaPor').populate('imagens').populate('textos').populate('laudo');

        res.status(200).json(evidencias);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar evidências" });
    }
};

export const getEvidenciaById = async (req, res) => {
    const { id } = req.params;

    try {
        const evidencia = await Evidencia.findById(id).populate('coletadaPor').populate('imagens').populate('textos').populate('laudo');

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
    const { tipo, dataColeta, status, coletadaPor, latitude, longitude } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            tipo,
            dataColeta,
            status,
            coletadaPor,
            geolocalizacao: {
                latitude,
                longitude
            }
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
    const { userId, casoId } = req.body;

    try {

        // Remove all relations from evidencia
        const evidenciaRelations = await Evidencia.findById(req.params.id).populate('imagens textos laudo');

        if (evidenciaRelations.imagens?.length) {
            const imagemIds = evidenciaRelations.imagens.map(i => i._id);
            await ImagemEvidencia.deleteMany({ _id: { $in: imagemIds } });
        }

        if (evidenciaRelations.textos?.length) {
            const textoIds = evidenciaRelations.textos.map(t => t._id);
            await TextoEvidencia.deleteMany({ _id: { $in: textoIds } });
        }

        if (evidenciaRelations.laudo) {
            await Laudo.findByIdAndDelete(evidenciaRelations.laudo._id);
        }

        const deletedEvidencia = await Evidencia.findByIdAndDelete(req.params.id);

        if (!deletedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        await User.findByIdAndUpdate(
            userId,
            { $pull: { evidencias: deletedEvidencia._id } },
            { new: true }
        );

        await Caso.findByIdAndUpdate(
            casoId,
            { $pull: { evidencias: deletedEvidencia._id } },
            { new: true }
        );

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
    const { idImagem: idImagemQuery } = req.query;
    
    // Aceita idImagem tanto do body quanto da query
    const imagemId = idImagem || idImagemQuery;

    if (!imagemId) {
        return res.status(400).json({ error: "ID da imagem é obrigatório" });
    }

    try {
        // Primeiro, remove o ID da imagem da lista de imagens da evidência
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $pull: { imagens: imagemId }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        // Depois, deleta a imagem do banco de dados
        const imagem = await ImagemEvidencia.findByIdAndDelete(imagemId);
        if (!imagem) {
            return res.status(404).json({ error: "Imagem não encontrada" });
        }

        res.status(200).json({ 
            message: "Imagem removida da evidência e deletada com sucesso!", 
            evidencia: updatedEvidencia 
        });
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
    const { idTexto: idTextoQuery } = req.query;
    
    // Aceita idTexto tanto do body quanto da query
    const textoId = idTexto || idTextoQuery;

    if (!textoId) {
        return res.status(400).json({ error: "ID do texto é obrigatório" });
    }

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $pull: { textos: textoId }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Texto removido da evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover texto da evidência" });
    }
};

export const addLaudoToEvidencia = async (req, res) => {
    const { id } = req.params;
    const { idLaudo } = req.body;

    try {
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $set: { laudo: idLaudo }
        }, { new: true });

        if (!updatedEvidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        res.status(200).json({ message: "Laudo adicionado à evidência com sucesso!", evidencia: updatedEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar laudo à evidência" });
    }
};

export const removeLaudoFromEvidencia = async (req, res) => {
    const { id } = req.params;

    try {
        // Primeiro, busca a evidência para verificar se tem laudo
        const evidencia = await Evidencia.findById(id);
        if (!evidencia) {
            return res.status(404).json({ error: "Evidência não encontrada" });
        }

        // Se não tem laudo, retorna erro
        if (!evidencia.laudo) {
            return res.status(400).json({ error: "Esta evidência não possui laudo associado" });
        }

        // Remove o laudo da evidência
        const updatedEvidencia = await Evidencia.findByIdAndUpdate(id, {
            $set: { laudo: null }
        }, { new: true });

        // Deleta o laudo do banco de dados
        await Laudo.findByIdAndDelete(evidencia.laudo);

        res.status(200).json({ 
            message: "Laudo removido da evidência e deletado com sucesso!", 
            evidencia: updatedEvidencia 
        });
    } catch (error) {
        console.error('Erro ao remover laudo da evidência:', error);
        res.status(500).json({ error: "Erro ao remover laudo da evidência" });
    }
};
