import mongoose from "mongoose";

const VitimaSchema = mongoose.Schema({
    nome: { type: String, required: false },
    cpf: { type: String, unique: true, sparse: true },
    rg: { type: String, unique: true, sparse: true },
    status: { type: String, required: true },
    caso: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Caso', required: true
    },
}, { timestamps: true });

const Vitima = mongoose.model('Vitima', VitimaSchema);

export default Vitima;