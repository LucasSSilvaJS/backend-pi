import mongoose from "mongoose";

const OdontoSchema = mongoose.Schema({
    nome: {type: String, required: true},
    cro: {type: String, required: true, unique: true},   
}, {timestamps: true});

const Odonto = mongoose.model('Odonto', OdontoSchema);

export default Odonto;