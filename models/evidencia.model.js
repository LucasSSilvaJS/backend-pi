import mongoose from "mongoose";

const EvidenciaSchema = mongoose.Schema({
    tipo: { type: String, required: true },
    dataColeta: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Em análise', 'Concluído'], default: 'Em análise' },
    coletadaPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imagens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImagemEvidencia' }],
    textos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TextoEvidencia' }],
}, { timestamps: true });

const Evidencia = mongoose.model('Evidencia', EvidenciaSchema);

export default Evidencia;