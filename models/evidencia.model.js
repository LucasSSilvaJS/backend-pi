import mongoose from "mongoose";

const EvidenciaSchema = mongoose.Schema({
    tipo: { type: String, required: true },
    dataColeta: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Em análise', 'Concluído'], default: 'Em análise' },
    coletadaPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    urlEvidencia: { type: [String], require: true },
    caso: { type: mongoose.Schema.Types.ObjectId, ref: 'Caso', required: false },
}, { timestamps: true });

const Evidencia = mongoose.model('Evidencia', EvidenciaSchema);

export default Evidencia;