import express from "express";
import {
    getAllTextosEvidencia,
    getTextoEvidenciaById,
    createTextoEvidencia,
    updateTextoEvidencia,
    deleteTextoEvidencia
} from '../controllers/texto.evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllTextosEvidencia)
    .post(authMiddleware("admin", "perito", "assistente"), createTextoEvidencia);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getTextoEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), updateTextoEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteTextoEvidencia);

export default router;