import express from "express";
import {
    createEvidencia,
    getAllEvidencias,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidencia,
    addImagemToEvidencia,
    removeImagemFromEvidencia,
    addTextoToEvidencia,
    removeTextoFromEvidencia,
    addLaudoToEvidencia,
    removeLaudoFromEvidencia
} from '../controllers/evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.js";


const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllEvidencias)
    .post(authMiddleware("admin", "perito"), upload.single('file'), createEvidencia);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getEvidenciaById)
    .put(authMiddleware("admin", "perito"), updateEvidencia)
    .delete(authMiddleware("admin", "perito"), deleteEvidencia);

router.route('/:id/imagens')
    .post(authMiddleware("admin", "perito", "assistente"), upload.single('file'), addImagemToEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), removeImagemFromEvidencia);

router.route('/:id/textos')
    .post(authMiddleware("admin", "perito", "assistente"), addTextoToEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), removeTextoFromEvidencia);

router.route('/:id/laudos')
    .post(authMiddleware("admin", "perito", "assistente"), addLaudoToEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), removeLaudoFromEvidencia);

export default router;
