import express from "express";
import {
    createLaudo,
    getAllLaudos,
    getLaudoById,
    updateLaudo,
    deleteLaudo,
    addPeritoToLaudo,
    addRelatorioToLaudo,
    addCasoToLaudo,
    addPacienteToLaudo
} from '../controllers/laudo.controller.js';

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito"), getAllLaudos)
    .post(authMiddleware("admin", "perito"), createLaudo);

router.route('/:id')
    .get(authMiddleware("admin", "perito"), getLaudoById)
    .put(authMiddleware("admin", "perito"), updateLaudo)
    .delete(authMiddleware("admin", "perito"), deleteLaudo);

router.route('/add-perito')
    .patch(authMiddleware("admin", "perito"), addPeritoToLaudo);

router.route('/add-relatorio')
    .patch(authMiddleware("admin", "perito"), addRelatorioToLaudo);

router.route('/add-caso')
    .patch(authMiddleware("admin", "perito"), addCasoToLaudo);

router.route('/add-paciente')
    .patch(authMiddleware("admin", "perito"), addPacienteToLaudo);

export default router;