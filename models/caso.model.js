import mongoose from "mongoose";

const CasoSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, required: true, enum: ['Em andamento', 'Finalizado', 'Arquivado'], default: 'Em andamento' },
    dataAbertura: { type: Date, required: true, default: Date.now },
    dataFechamento: { type: Date, required: false },
    evidencias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Evidencia', required: false}],
    relatorios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Relatorio', required: false}],
    vitimas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Vitima', required: true}],
}, { timestamps: true });

const Caso = mongoose.model('Caso', CasoSchema);

export default Caso;
