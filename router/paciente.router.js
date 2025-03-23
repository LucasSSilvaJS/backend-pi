import express from "express";
import {
    createPaciente, 
    getAllPacientes, 
    getPacienteById, 
    updatePaciente,
    deletePaciente
} from '../controllers/paciente.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllPacientes)
    .post(createPaciente);

router.route('/:id')
    .get(getPacienteById)
    .put(updatePaciente)
    .delete(deletePaciente);

export default router;