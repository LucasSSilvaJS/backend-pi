import express from "express";
import { register, login, getUsers, desativarUsuario, reativarUsuario, alterarSenha, alterarEmail } from "../controllers/auth.controller.js";
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

/**
 * @swagger
 * /auth/users:
 *   get:
 *     tags:
 *       - Autenticação
 *     summary: Retorna todos os usuários
 *     security:
 *       - bearerAuth: []
 *     description: Retorna todos os usuários cadastrados no banco de dados
 *     responses:
 *       200:
 *         description: Usuários encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
router.route("/users").get(authMiddleware("admin"), getUsers);

/**
 * @swagger
 * /auth/users/{id}/desativar:
 *   put:
 *     tags:
 *       - Autenticação
 *     summary: Desativa um usuário
 *     security:
 *       - bearerAuth: []
 *     description: Desativa um usuário existente, alterando seu status para inativo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser desativado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *                 description: Motivo da desativação do usuário
 *                 example: Aposentadoria
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário desativado com sucesso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     cargo:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: inativo
 *                     motivoDesativacao:
 *                       type: string
 *       400:
 *         description: Usuário já está inativo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário já está inativo
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
 *         description: Erro ao desativar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao desativar usuário
 */
router.route("/users/:id/desativar")
    .put(authMiddleware("admin"), desativarUsuario);

/**
 * @swagger
 * /auth/users/{id}/reativar:
 *   put:
 *     tags:
 *       - Autenticação
 *     summary: Reativa um usuário
 *     security:
 *       - bearerAuth: []
 *     description: Reativa um usuário que está inativo, alterando seu status para ativo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser reativado
 *     responses:
 *       200:
 *         description: Usuário reativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário reativado com sucesso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     cargo:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: ativo
 *                     motivoDesativacao:
 *                       type: string
 *                       nullable: true
 *       400:
 *         description: Usuário já está ativo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário já está ativo
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
 *         description: Erro ao reativar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao reativar usuário
 */
router.route("/users/:id/reativar")
    .put(authMiddleware("admin"), reativarUsuario);

/**
 * @swagger
 * /auth/alterar-senha:
 *   put:
 *     tags:
 *       - Autenticação
 *     summary: Altera a senha do usuário
 *     security:
 *       - bearerAuth: []
 *     description: Altera a senha do usuário logado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senhaAtual
 *               - novaSenha
 *             properties:
 *               senhaAtual:
 *                 type: string
 *                 description: Senha atual do usuário
 *                 example: "123456"
 *               novaSenha:
 *                 type: string
 *                 description: Nova senha do usuário
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Senha alterada com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Senha atual e nova senha são obrigatórias
 *       401:
 *         description: Senha atual incorreta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Senha atual incorreta
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
 *         description: Erro ao alterar senha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao alterar senha
 */
router.route("/alterar-senha")
    .put(authMiddleware("admin", "perito", "assistente"), alterarSenha);

/**
 * @swagger
 * /auth/alterar-email:
 *   put:
 *     tags:
 *       - Autenticação
 *     summary: Altera o email do usuário
 *     security:
 *       - bearerAuth: []
 *     description: Altera o email do usuário logado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Novo email do usuário
 *                 example: "novo.email@exemplo.com"
 *     responses:
 *       200:
 *         description: Email alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email alterado com sucesso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "627b6a9c4f6f6e62d5c7b6a9"
 *                     username:
 *                       type: string
 *                       example: "joao"
 *                     email:
 *                       type: string
 *                       example: "novo.email@exemplo.com"
 *                     cargo:
 *                       type: string
 *                       example: "perito"
 *       400:
 *         description: Email não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email é obrigatório
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
 *       409:
 *         description: Email já em uso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email já está em uso
 *       500:
 *         description: Erro ao alterar email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao alterar email
 */
router.route("/alterar-email")
    .put(authMiddleware("admin", "perito", "assistente"), alterarEmail);

export default router;