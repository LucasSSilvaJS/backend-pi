import express from "express";

import {
    createOdontograma,
    getAllOdontogramas,
    getOdontogramaById,
    updateOdontograma,
    deleteOdontograma
} from '../controllers/odontograma.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllOdontogramas)
    .post(createOdontograma);

router.route('/:id')
    .get(getOdontogramaById)
    .put(updateOdontograma)
    .delete(deleteOdontograma);

export default router;
