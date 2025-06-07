import mongoose from "mongoose";

const VitimaSchema = mongoose.Schema({
    //ID GERADO AUTOMATICAMENTE PELO SISTEMA
    nic: { type: String, required: false },
    nome: { type: String, required: false },
    genero: { type: String, required: false },
    idade: { type: Number, required: false },
    documento: { type: String, unique: true, sparse: true },
    endereco: { type: String, required: false },
    corEtnia: { type: String, required: false },
    odontograma: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Odontograma', required: false }],
});

const Vitima = mongoose.model('Vitima', VitimaSchema);

export default Vitima;
