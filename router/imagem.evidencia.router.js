import express from "express";
import {
    getAllImagemEvidencia,
    getImagemEvidenciaById,
    createImagemEvidencia,
    updateImagemEvidencia,
    deleteImagemEvidencia
} from '../controllers/imagem.evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllImagemEvidencia)
    .post(authMiddleware("admin", "perito", "assistente"), createImagemEvidencia);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getImagemEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), updateImagemEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteImagemEvidencia);

export default router;
