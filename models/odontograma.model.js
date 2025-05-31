import mongoose from "mongoose";

const dentesPadrao = [];
const quadrantes = [1, 2, 3, 4];
const posicoes = [1, 2, 3, 4, 5, 6, 7, 8];

quadrantes.forEach(q => {
  posicoes.forEach(p => {
    dentesPadrao.push({ identificacao: parseInt(`${q}${p}`), observacao: "" });
  });
});

const OdontogramaSchema = mongoose.Schema({
    dentes: {
        type: [{
            identificacao: { type: Number, required: true },
            observacao: { type: String, required: false }
    }],
    default: dentesPadrao
    }
});

const Odontograma = mongoose.model('Odontograma', OdontogramaSchema);

export default Odontograma;