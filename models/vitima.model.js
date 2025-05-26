import mongoose from "mongoose";

const VitimaSchema = mongoose.Schema({
    nic: { type: String, required: false },
    nome: { type: String, required: false },
    genero: { type: String, required: false },
    idade: { type: Number, required: false },
    documento: { type: String, unique: true, sparse: true },
    endereco: { type: String, required: false },
    corEtnia: { type: String, required: false },
    odontograma: { type: String, required: false },
    regioesAnatomicas: { type: String, required: false },
});

const Vitima = mongoose.model('Vitima', VitimaSchema);

export default Vitima;
