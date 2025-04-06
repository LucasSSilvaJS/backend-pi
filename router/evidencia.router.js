import express from "express";
import {
    createEvidencia,
    getAllEvidencias,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidencia
} from '../controllers/evidencia.controller.js';

import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.route('/')
    .get(getAllEvidencias)
    .post( upload.array('files', 10), createEvidencia);

router.route('/:id')
    .get(getEvidenciaById)
    .put(upload.array('files', 10), updateEvidencia)
    .delete(deleteEvidencia);

export default router;
