import mongoose from "mongoose";

const CasoSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, required: true, enum: ['Em análise', 'Concluído', 'Em espera'], default: 'Em espera' },
    dataAbertura: { type: Date, required: true, default: Date.now },
    dataFechamento: { type: Date, required: false },
    dataOcorrencia: {type: Date, required: true},
    paciente: {type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: false},
    localizacao: {
        latitude: {type: String, require: false},
        longitude: {type: String, require: false},
    }
}, { timestamps: true });

const Caso = mongoose.model('Caso', CasoSchema);

export default Caso;

//data da ocorrencia
//localização
//opcional
//possivel entidade relatorio geral do caso