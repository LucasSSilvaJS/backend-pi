import mongoose from "mongoose";

const LaudoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    peritoResponsavel: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    dataCriacao: { type: Date, required: true, default: Date.now},
    parecer: {
        caso: {type: mongoose.Schema.Types.ObjectId, ref: 'Caso', required: true}
    },
    detalhamento: { type: String, required: true },
    conclusao: { type: String, required: true },

}, { timestamps: true });

const Laudo = mongoose.model('Laudo', LaudoSchema);

export default Laudo;
