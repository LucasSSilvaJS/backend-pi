import mongoose from "mongoose";

const ImagemEvidenciaSchema = new mongoose.Schema({
    imagemUrl: { type: String, required: true },
});

const ImagemEvidencia = mongoose.model('ImagemEvidencia', ImagemEvidenciaSchema);

export default ImagemEvidencia;
