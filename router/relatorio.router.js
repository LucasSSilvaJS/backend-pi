import {
    createRelatorio,
    getAllRelatorios,
    getRelatorioById,
    updateRelatorio,
    deleteRelatorio
} from '../controllers/relatorio.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import express from "express";

const router = express.Router();

router.route('/')
    .post(authMiddleware("admin", "perito"), createRelatorio)
    .get(authMiddleware("admin", "perito", "assistente"), getAllRelatorios);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getRelatorioById)
    .put(authMiddleware("admin", "perito"), updateRelatorio)
    .delete(authMiddleware("admin", "perito"), deleteRelatorio);

export default router;
