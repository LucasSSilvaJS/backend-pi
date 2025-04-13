import express from "express";
import {
    createPaciente,
    getAllPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente,
    addCasoToPaciente
} from '../controllers/paciente.controller.js';

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

//teste de middleware

router.route('/')
    .get(authMiddleware("admin", "perito"), getAllPacientes)
    .post(authMiddleware("admin", "perito"), createPaciente);

router.route('/:id')
    .get(authMiddleware("admin", "perito"), getPacienteById)
    .put(authMiddleware("admin", "perito"), updatePaciente)
    .delete(authMiddleware("admin", "perito"), deletePaciente);

router.route('/add-caso')
    .patch(authMiddleware("admin", "perito"), addCasoToPaciente);

export default router;
