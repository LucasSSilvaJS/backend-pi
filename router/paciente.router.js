import express from "express";
import {
    createPaciente,
    getAllPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente
} from '../controllers/paciente.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

//teste de middleware

router.route('/')
    .get(authMiddleware, getAllPacientes)
    .post(createPaciente);

router.route('/:id')
    .get(getPacienteById)
    .put(updatePaciente)
    .delete(deletePaciente);

export default router;
