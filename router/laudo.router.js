import express from "express";
import {
    createLaudo,
    getAllLaudos,
    getLaudoById,
    updateLaudo,
    deleteLaudo
} from '../controllers/laudo.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllLaudos)
    .post(createLaudo);

router.route('/:id')
    .get(getLaudoById)
    .put(updateLaudo)
    .delete(deleteLaudo);

export default router;