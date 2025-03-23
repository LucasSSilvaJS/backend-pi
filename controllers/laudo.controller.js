import Laudo from "../models/laudo.model.js"

import cloudinary from "../services/cloudinary.js";

export const createLaudo = async (req, res) => {
    try {
        const {
            odonto_id,
            paciente_id,
            motivo,
            historico_clinico,
            exame_clinico,
            descricao_lesoes,
            conclusao
        } = req.body;

        const novoLaudo = new Laudo({
            odonto_id,
            paciente_id,
            motivo,
            historico_clinico,
            exame_clinico: {
                descricao: exame_clinico?.descricao,
                imagens_url: exame_clinico?.imagens_url || []
            },
            descricao_lesoes: {
                detalhamento: descricao_lesoes?.detalhamento,
                grau_de_gravidade: descricao_lesoes?.grau_de_gravidade,
                sequelas_permanentes: descricao_lesoes?.sequelas_permanentes
            },
            conclusao
        });

        if (req.files) {
            const fileUrls = [];
            for (let i = 0; i < req.files.length; i++) {
                const result = await cloudinary.uploader.upload(req.files[i].path, { resource_type: "auto" });
                fileUrls.push(result.secure_url);
            }

            novoLaudo.exame_clinico.imagens_url = fileUrls;
        }
        
        await novoLaudo.save();

        res.status(201).json({
            message: 'Laudo criado com sucesso!',
            laudo: novoLaudo
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar laudo' });
    }
};

export const getAllLaudos = async (req, res) => {
    try {
        const laudos = await Laudo.find();
        res.status(200).json(laudos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar laudos' });
    }
};

export const getLaudoById = async (req, res) => {
    try {
        const { id } = req.params;
        const laudo = await Laudo.findById(id);

        if (!laudo) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }

        res.status(200).json(laudo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar laudo' });
    }
};

export const updateLaudo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const laudoAtualizado = await Laudo.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!laudoAtualizado) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }

        res.status(200).json({
            message: 'Laudo atualizado com sucesso!',
            laudo: laudoAtualizado
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar laudo' });
    }
};

export const deleteLaudo = async (req, res) => {
    try {
        const { id } = req.params;

        const laudoDeletado = await Laudo.findByIdAndDelete(id);

        if (!laudoDeletado) {
            return res.status(404).json({ error: 'Laudo não encontrado' });
        }

        res.status(200).json({ message: 'Laudo deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar laudo' });
    }
};
