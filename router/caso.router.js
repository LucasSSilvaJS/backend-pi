import express from "express";
import {
    createCaso,
    getAllCasos,
    getCasoById,
    updateCaso,
    deleteCaso,
    addEvidenciaToCaso,
    removeEvidenciaFromCaso,
    addRelatorioToCaso,
    removeRelatorioFromCaso,
    addVitimaToCaso,
    removeVitimaFromCaso
} from '../controllers/caso.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllCasos)
    .post(authMiddleware("admin", "perito"), createCaso);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getCasoById)
    .put(authMiddleware("admin", "perito"), updateCaso)
    .delete(authMiddleware("admin", "perito"), deleteCaso);

router.route('/:id/evidencias')
    .post(authMiddleware("admin", "perito", "assistente"), addEvidenciaToCaso)
    .delete(authMiddleware("admin", "perito", "assistente"), removeEvidenciaFromCaso);

router.route('/:id/relatorios')
    .post(authMiddleware("admin", "perito"), addRelatorioToCaso)
    .delete(authMiddleware("admin", "perito"), removeRelatorioFromCaso);

router.route('/:id/vitimas')
    .post(authMiddleware("admin", "perito"), addVitimaToCaso)
    .delete(authMiddleware("admin", "perito"), removeVitimaFromCaso);

export default router;