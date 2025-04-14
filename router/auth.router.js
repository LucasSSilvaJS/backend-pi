import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Cria um novo usuário
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123456789
 *                     username:
 *                       type: string
 *                       example: joao
 *                     email:
 *                       type: string
 *                       example: joao@exemplo.com
 *                     cargo:
 *                       type: string
 *                       example: admin
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU3N2Y2NTk1NGQ3NjI2NmIyIiwiZW1haWwiOiJqYW9vQGV4ZW1wbGUuY29tIiwiYXNzZW1lZCI6ImFkbWluIiwiaWF0IjoxNjQ3ODkwNTM2LCJleHAiOjE2NDc4OTQ1MzZ9.0J0s2z0qJ8Jjw6Z0k5J0l
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       409:
 *         description: Usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário já existe
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor 
 */
router.route("/register").post(authMiddleware("admin"), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Autenticação
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
 *     responses:
 *       200:
 *         description: Logado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logado com sucesso!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123456789
 *                     username:
 *                       type: string
 *                       example: joao
 *                     email:
 *                       type: string
 *                       example: joao@exemplo.com
 *                     cargo:
 *                       type: string
 *                       example: admin
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU3N2Y2NTk1NGQ3NjI2NmIyIiwiZW1haWwiOiJqYW9vQGV4ZW1wbGUuY29tIiwiYXNzZW1lZCI6ImFkbWluIiwiaWF0IjoxNjQ3ODkwNTM2LCJleHAiOjE2NDc4OTQ1MzZ9.0J0s2z0qJ8Jjw6Z0k5J0l
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor 
 */
router.route("/login").post(login);

export default router;