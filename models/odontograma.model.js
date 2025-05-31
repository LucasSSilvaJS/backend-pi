import mongoose from "mongoose";

//Comentário teste incluir lista de dentes e commentário de observação
const OdontogramaSchema = mongoose.Schema({
    dentes: [{
    identificacao: { type: Number, required: true },
    observacao: { type: String, required: false }
    }]
});

const Odontograma = mongoose.model('Odontograma', OdontogramaSchema);

export default Odontograma;