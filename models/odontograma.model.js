import mongoose from "mongoose";

const OdontogramaSchema = mongoose.Schema({
    identificacao: { type: Number, required: true },
    observacao: { type: String, required: true },
});

const Odontograma = mongoose.model('Odontograma', OdontogramaSchema);

export default Odontograma;