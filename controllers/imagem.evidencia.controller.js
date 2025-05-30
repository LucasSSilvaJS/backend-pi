// Necessário mudar posteriormente

const mongoose = require('mongoose');
const ImagemEvidencia = mongoose.model('ImagemEvidencia');

exports.getAllImagemEvidencia = async (req, res) => {
    try {
        const imagens = await ImagemEvidencia.find().sort({ createdAt: -1 });
        res.status(200).json(imagens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagens de evidência' });
    }
};

exports.getImagemEvidenciaById = async (req, res) => {
    try {
        const imagem = await ImagemEvidencia.findById(req.params.id);
        if (!imagem) {
            return res.status(404).json({ error: 'Imagem de evidência não encontrada' });
        }
        res.status(200).json(imagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagem de evidência por ID' });
    }
};

exports.createImagemEvidencia = async (req, res) => {
    try {
        if (req.file) {
            const imagemUrl = await uploadToCloudinary(req.file);
            req.body.imagemUrl = imagemUrl;
        }
        const imagem = new ImagemEvidencia(req.body);
        await imagem.save();
        res.status(201).json(imagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar imagem de evidência' });
    }
};

exports.updateImagemEvidencia = async (req, res) => {
    try {
        if (req.file) {
            const imagemUrl = await uploadToCloudinary(req.file);
            req.body.imagemUrl = imagemUrl;
        }
        const imagem = await ImagemEvidencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!imagem) {
            return res.status(404).json({ error: 'Imagem de evidência não encontrada' });
        }
        res.status(200).json(imagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar imagem de evidência' });
    }
};

exports.deleteImagemEvidencia = async (req, res) => {
    try {
        const imagem = await ImagemEvidencia.findByIdAndRemove(req.params.id);
        if (!imagem) {
            return res.status(404).json({ error: 'Imagem de evidência não encontrada' });
        }
        res.status(200).json({ message: 'Imagem de evidência excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir imagem de evidência' });
    }
};
