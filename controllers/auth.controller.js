
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const register = async (req, res) => {
    const { username, cargo, email, password } = req.body;

    if (!username || !cargo || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const user = await User.create({
            username,
            email,
            password,
            cargo
        });

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email, cargo: user.cargo },
            process.env.JWT_SECRET || "secret"
        );

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                cargo: user.cargo,
                token,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ error: "Usuário já existe" });
        } else if (err.name === 'ValidationError') {
            res.status(400).json({ error: "Dados inválidos" });
        } else {
            console.error(err);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email, cargo: user.cargo },
            process.env.JWT_SECRET || "secret"
        );

        res.status(200).json({
            message: "Logado com sucesso!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                cargo: user.cargo,
                token,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao logar" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};
