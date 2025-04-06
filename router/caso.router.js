import express from "express";
import {
    createCaso, 
    getAllCasos, 
    getCasoById, 
    updateCaso,
    deleteCaso
} from '../controllers/caso.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllCasos)
    .post(createCaso);

router.route('/:id')
    .get(getCasoById)
    .put(updateCaso)
    .delete(deleteCaso);

export default router;