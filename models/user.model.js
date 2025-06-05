import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    cargo: { type: String, required: true, enum: ['admin', 'perito', 'assistente'], default: 'perito' },
    status: { type: String, required: true, enum: ['ativo', 'inativo'], default: 'ativo' },
    casos: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Caso',
            required: false
        }
    ],
    relatorios: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Relatorio',
            required: false
        }
    ],
    evidencias: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Evidencia',
            required: false
        }
    ]
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;

