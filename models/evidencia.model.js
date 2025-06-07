import mongoose from "mongoose";

const EvidenciaSchema = mongoose.Schema({
    tipo: { type: String, required: true },
    dataColeta: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Em análise', 'Concluído'], default: 'Em análise' },
    coletadaPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    geolocalizacao: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true }
    },
    //adicionar obrigatoriedade de imagens e textos pelo frontend
    imagens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImagemEvidencia', required: false }],
    textos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TextoEvidencia', required: false }],
    laudo: { type: mongoose.Schema.Types.ObjectId, ref: 'Laudo', required: false },
    //ADICIONAR LOCALIZAÇÃO EM EVIDENCIA
}, { timestamps: true });

const Evidencia = mongoose.model('Evidencia', EvidenciaSchema);

export default Evidencia;