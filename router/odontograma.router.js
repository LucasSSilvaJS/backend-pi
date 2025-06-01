import express from "express";

import {
    createOdontograma,
    getAllOdontogramas,
    getOdontogramaById,
    updateOdontograma,
    deleteOdontograma
} from '../controllers/odontograma.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllOdontogramas)
    .post(authMiddleware("admin", "perito"), createOdontograma);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getOdontogramaById)
    .put(authMiddleware("admin", "perito"), updateOdontograma)
    .delete(authMiddleware("admin", "perito"), deleteOdontograma);

export default router;
