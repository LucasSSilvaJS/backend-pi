import mongoose from "mongoose";

const VitimaSchema = mongoose.Schema({
    //ID GERADO AUTOMATICAMENTE PELO SISTEMA
    nic: { 
        type: String, 
        required: true, 
        unique: true,
        immutable: true, // Não pode ser alterado após a criação
        validate: {
            validator: function(v) {
                return /^\d{8}$/.test(v); // Deve conter exatamente 8 dígitos
            },
            message: props => `${props.value} não é um NIC válido! Deve conter exatamente 8 dígitos.`
        }
    },
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
