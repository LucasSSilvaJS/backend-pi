import express from "express";
import {
    createLaudo, 
    getAllLaudos, 
    getLaudoById, 
    updateLaudo,
    deleteLaudo
} from '../controllers/laudo.controller.js';

import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.route('/')
    .get(getAllLaudos)
    .post(upload.array('files', 10), createLaudo);

router.route('/:id')
    .get(getLaudoById)
    .put(updateLaudo)
    .delete(deleteLaudo);

export default router;