const mongoose = require('mongoose');

const ImagemEvidenciaSchema = new mongoose.Schema({
    imagemUrl: { type: String, required: true },
});

const ImagemEvidencia = mongoose.model('ImagemEvidencia', ImagemEvidenciaSchema);

module.exports = ImagemEvidencia;
