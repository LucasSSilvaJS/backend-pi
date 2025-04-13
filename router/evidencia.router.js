import express from "express";
import {
    createEvidencia,
    getAllEvidencias,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidencia,
    addLaudoToEvidencia
} from '../controllers/evidencia.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllEvidencias)
    .post(authMiddleware("admin", "perito", "assistente"), upload.array('files', 10), createEvidencia);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getEvidenciaById)
    .put(authMiddleware("admin", "perito", "assistente"), upload.array('files', 10), updateEvidencia)
    .delete(authMiddleware("admin", "perito", "assistente"), deleteEvidencia);

router.route('/add-laudo')
    .patch(authMiddleware("admin", "perito", "assistente"), addLaudoToEvidencia);

export default router;
