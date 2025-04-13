import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário único
 *                 example: joao
 *               cargo:
 *                 type: string
 *                 description: Cargo do usuário (admin, perito, assistente)
 *                 example: admin
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: 123456
 */
router.route("/register").post(authMiddleware("admin"), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login
 *     description: Realiza login com as credenciais fornecidas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: 123456
 */
router.route("/login").post(login);

export default router;