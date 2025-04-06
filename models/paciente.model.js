import mongoose from "mongoose";

const PacienteSchema = mongoose.Schema({
    nome: { type: String, required: false },
    cpf: { type: String, required: false, unique: true },
    rg: { type: String, required: false, unique: true },
    status: { type: String, required: true },
    caso: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Caso', required: true
    },
}, { timestamps: true });

const Paciente = mongoose.model('Paciente', PacienteSchema);

export default Paciente;