import mongoose from "mongoose";

const PacienteSchema = mongoose.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: false, unique: true},
    rg: {type: String, required: false, unique: true}
}, {timestamps: true});

const Paciente = mongoose.model('Paciente', PacienteSchema);

export default Paciente;