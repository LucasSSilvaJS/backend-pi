import Vitima from "../models/vitima.model.js";
import Odontograma from "../models/odontograma.model.js";
import Caso from "../models/caso.model.js";

export const getAllVitimas = async (req, res) => {
    console.log("[getAllVitimas] Iniciando busca de vítimas");
    try {
        const vitimas = await Vitima.find().populate("odontograma");
        console.log(`[getAllVitimas] Encontradas ${vitimas.length} vítimas`);
        res.status(200).json(vitimas);
    } catch (error) {
        console.error("[getAllVitimas] Erro:", error);
        res.status(500).json({ error: "Erro ao buscar vitimas", details: error.message });
    }
};

export const getVitimaById = async (req, res) => {
    const id = req.params.id;
    console.log(`[getVitimaById] Buscando vítima com ID: ${id}`);
    try {
        const vitima = await Vitima.findById(id).populate("odontograma");
        if (!vitima) {
            console.log(`[getVitimaById] Vítima não encontrada: ${id}`);
            return res.status(404).json({ error: "Vitima nao encontrada" });
        }
        console.log(`[getVitimaById] Vítima encontrada: ${id}`);
        res.status(200).json(vitima);
    } catch (error) {
        console.error(`[getVitimaById] Erro ao buscar vítima ${id}:`, error);
        res.status(500).json({ error: "Erro ao buscar vitima por ID", details: error.message });
    }
};

export const createVitima = async (req, res) => {
    try {
        const { nic, nome, genero, idade, documento, endereco, corEtnia, idCaso } = req.body;
        const vitima = new Vitima({
            nic,
            nome,
            genero,
            idade,
            documento,
            endereco,
            corEtnia,
            odontograma: [],
        });
        const savedVitima = await vitima.save();

        await Caso.findByIdAndUpdate(
            idCaso,
            { $addToSet: { vitimas: savedVitima._id } },
            { new: true }
        );

        res.status(201).json(savedVitima);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar vitima" });
    }
};

export const updateVitima = async (req, res) => {
    try {
        const id = req.params.id;
        const { nic, nome, genero, idade, documento, endereco, corEtnia } = req.body;
        const updatedVitima = await Vitima.findByIdAndUpdate(
            id,
            { $set: { nic, nome, genero, idade, documento, endereco, corEtnia } },
            { new: true }
        );
        if (!updatedVitima) {
            return res.status(404).json({ error: "Vitima nao encontrada" });
        }
        res.status(200).json(updatedVitima);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar vitima" });
    }
};

export const deleteVitima = async (req, res) => {
    try {
        const id = req.params.id;
        const { idCaso } = req.body;
        const vitima = await Vitima.findById(id).populate('odontograma');
        
        if (vitima.odontograma?.length) {
            const odontogramaIds = vitima.odontograma.map(o => o._id);
            await Odontograma.deleteMany({ _id: { $in: odontogramaIds } });
        }
        
        const deletedVitima = await Vitima.findByIdAndDelete(id);
        
        if (!deletedVitima) {
            return res.status(404).json({ error: "Vitima nao encontrada" });
        }

        await Caso.findByIdAndUpdate(
            idCaso,
            { vitimas: id },
            { $pull: { vitimas: id } }
        );

        res.status(200).json({ message: "Vitima deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar vitima" });
    }
};

export const addOdontogramaToVitima = async (req, res) => {
    try {
        const { id } = req.params;
        const { odontogramaId } = req.body;
        
        const updatedVitima = await Vitima.findByIdAndUpdate(
            id,
            { $push: { odontograma: odontogramaId } },
            { new: true }
        );
        
        if (!updatedVitima) {
            return res.status(404).json({ error: "Vitima nao encontrada" });
        }
        
        res.status(200).json(updatedVitima);
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar odontograma" });
    }
};

export const removeOdontogramaFromVitima = async (req, res) => {
    try {
        const { id } = req.params;
        const { odontogramaId } = req.body;
        
        const updatedVitima = await Vitima.findByIdAndUpdate(
            id,
            { $pull: { odontograma: odontogramaId } },
            { new: true }
        );
        
        if (!updatedVitima) {
            return res.status(404).json({ error: "Vitima nao encontrada" });
        }
        
        res.status(200).json(updatedVitima);
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover odontograma" });
    }
};

