import express from "express";
import {
    createLaudo,
    getAllLaudos,
    getLaudoById,
    updateLaudo,
    deleteLaudo,
} from "../controllers/laudo.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(authMiddleware("admin", "perito", "assistente"), getAllLaudos)
    .post(authMiddleware("admin", "perito"), createLaudo);

router.route('/:id')
    .get(authMiddleware("admin", "perito", "assistente"), getLaudoById)
    .put(authMiddleware("admin", "perito"), updateLaudo)
    .delete(authMiddleware("admin", "perito"), deleteLaudo);

export default router;