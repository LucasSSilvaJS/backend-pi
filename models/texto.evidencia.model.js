const mongoose = require('mongoose');

const TextoEvidenciaSchema = new mongoose.Schema({
    conteudo: { type: String, required: true },
}, { timestamps: true });

const TextoEvidencia = mongoose.model('TextoEvidencia', TextoEvidenciaSchema);

module.exports = TextoEvidencia;
