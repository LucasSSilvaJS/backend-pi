import express from "express";
import {
    createOdonto, 
    getAllOdontos, 
    getOdontoById, 
    updateOdonto,
    deleteOdonto
} from '../controllers/odonto.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllOdontos)
    .post(createOdonto);

router.route('/:id')
    .get(getOdontoById)
    .put(updateOdonto)
    .delete(deleteOdonto);

export default router;