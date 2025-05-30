import mongoose from "mongoose";

const OdontogramaSchema = mongoose.Schema({
    numero: { type: Number, required: true },
    observacao: { type: String, required: false }
});

const Odontograma = mongoose.model('Odontograma', OdontogramaSchema);

export default Odontograma;

