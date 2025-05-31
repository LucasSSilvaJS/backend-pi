import Odontograma from '../models/odontograma.model.js';

export const createOdontograma = async (req, res) => {
  try {
    const newOdontograma = await Odontograma.save({});
    res.status(201).json(newOdontograma);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar odontograma", erro });
  }
};

export const getAllOdontogramas = async (req, res) => {
    try {
        const odontogramas = await Odontograma.find();
        res.status(200).json(odontogramas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar odontogramas" });
    }
};

export const getOdontogramaById = async (req, res) => {
    try {
        const { id } = req.params;
        const odontograma = await Odontograma.findById(id);
        if (!odontograma) {
            return res.status(404).json({ error: "Odontograma nao encontrado" });
        }
        res.status(200).json(odontograma);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar odontograma" });
    }
};

export const updateOdontograma = async (req, res) => {
    const { id } = req.params;
    const { identificacao, observacao } = req.body;

   try {
    const odontograma = await Odontograma.findById(id);
    if (!odontograma) {
      return res.status(404).json({ mensagem: "Odontograma não encontrado" });
    }
        const dente = odontograma.dentes.find(d => d.identificacao === identificacao);
    if (!dente) {
      return res.status(404).json({ mensagem: "Dente não encontrado no odontograma" });
    }

    dente.observacao = observacao;
    await odontograma.save();

    res.status(200).json(odontograma);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao atualizar dente", erro });
  }
};

export const deleteOdontograma = async (req, res) => {
    try {
    const odontograma = await Odontograma.findByIdAndDelete(req.params.id);
    if (!odontograma) {
      return res.status(404).json({ mensagem: "Odontograma não encontrado" });
    }
    res.status(200).json({ mensagem: "Odontograma deletado com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar odontograma", erro });
  }
};