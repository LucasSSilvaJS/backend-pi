import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { uploadToCloudinary } from '../utils/upload.cloudinary.js';

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
            { userId: user._id, username: user.username, email: user.email, cargo: user.cargo },
            process.env.JWT_SECRET || "secret"
        );

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: {
                id: user._id,
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

        if (user.status === 'inativo') {
            return res.status(403).json({ error: "Usuário inativo. Entre em contato com o administrador." });
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email, cargo: user.cargo },
            process.env.JWT_SECRET || "secret"
        );

        res.status(200).json({
            message: "Logado com sucesso!",
            user: {
                id: user._id,
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
        const users = await User.find({})
            .select("-password")
            .populate({
                path: 'relatorios',
                populate: {
                    path: 'peritoResponsavel'
                }
            });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

export const desativarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (usuario.status === 'inativo') {
            return res.status(400).json({ message: "Usuário já está inativo" });
        }

        usuario.status = 'inativo';
        await usuario.save();

        res.status(200).json({ message: "Usuário desativado com sucesso" });
    } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        res.status(500).json({ message: "Erro ao desativar usuário", error: error.message });
    }
};

export const reativarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (usuario.status === 'ativo') {
            return res.status(400).json({ message: "Usuário já está ativo" });
        }

        usuario.status = 'ativo';
        await usuario.save();

        res.status(200).json({ message: "Usuário reativado com sucesso" });
    } catch (error) {
        console.error("Erro ao reativar usuário:", error);
        res.status(500).json({ message: "Erro ao reativar usuário", error: error.message });
    }
};

export const alterarSenha = async (req, res) => {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.userId;

    if (!senhaAtual || !novaSenha) {
        return res.status(400).json({ error: "Senha atual e nova senha são obrigatórias" });
    }

    try {
        const user = await User.findById(userId).select("+password");

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const senhaValida = await user.comparePassword(senhaAtual);

        if (!senhaValida) {
            return res.status(401).json({ error: "Senha atual incorreta" });
        }

        user.password = novaSenha;
        await user.save();

        res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (err) {
        console.error("Erro ao alterar senha:", err);
        res.status(500).json({ error: "Erro ao alterar senha" });
    }
};

export const alterarEmail = async (req, res) => {
    const { email } = req.body;
    const userId = req.user.userId;

    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Verifica se o novo email já está em uso
        const emailExistente = await User.findOne({ email });
        if (emailExistente && emailExistente._id.toString() !== userId) {
            return res.status(409).json({ error: "Email já está em uso" });
        }

        user.email = email;
        await user.save();

        res.status(200).json({
            message: "Email alterado com sucesso",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                cargo: user.cargo
            }
        });
    } catch (err) {
        console.error("Erro ao alterar email:", err);
        res.status(500).json({ error: "Erro ao alterar email" });
    }
};

export const atualizarFotoPerfil = async (req, res) => {
    const userId = req.user.userId;

    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const imagemUrl = await uploadToCloudinary(req.file);
        user.fotoPerfil = imagemUrl;
        await user.save();

        res.status(200).json({
            message: "Foto de perfil atualizada com sucesso",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                cargo: user.cargo,
                fotoPerfil: user.fotoPerfil
            }
        });
    } catch (err) {
        console.error("Erro ao atualizar foto de perfil:", err);
        res.status(500).json({ error: "Erro ao atualizar foto de perfil" });
    }
};

