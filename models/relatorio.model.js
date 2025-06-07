import mongoose from "mongoose";

const RelatorioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    //GERAR O RELATORIO POR LLM
    conteudo: { type: String, required: true },
    peritoResponsavel: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dataCriacao: { type: Date, required: true, default: Date.now},
}, { timestamps: true });

const Relatorio = mongoose.model('Relatorio', RelatorioSchema);

export default Relatorio;