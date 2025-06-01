import express from "express";

import {
    createOdontograma,
    getAllOdontogramas,
    getOdontogramaById,
    updateOdontogramaById,
    deleteOdontogramaById
} from '../controllers/odontograma.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllOdontogramas)
    .post(authMiddleware("admin", "perito"), createOdontograma);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getOdontogramaById)
    .put(authMiddleware("admin", "perito"), updateOdontogramaById)
    .delete(authMiddleware("admin", "perito"), deleteOdontogramaById);

export default router;
