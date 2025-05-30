import mongoose from 'mongoose';

const LaudoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
    },
    conclusao: {
        type: String,
        required: true,
    },
    peritoResponsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dataCriacao: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Laudo = mongoose.model('Laudo', LaudoSchema);

export default Laudo;
