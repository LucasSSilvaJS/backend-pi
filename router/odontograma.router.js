import express from "express";

import {
    createOdontograma,
    getAllOdontogramas,
    getOdontogramaById,
    updateOdontograma,
    deleteOdontograma
} from '../controllers/odontograma.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllOdontogramas)
    .post(createOdontograma);

router.route('/:id')
    .get(getOdontogramaById)
    .put(updateOdontograma)
    .delete(deleteOdontograma);

export default router;
//     return res.status(404).json({ mensagem: "Odontograma não encontrado" });
//     }
//     res.status(200).json({ mensagem: "Odontograma deletado com sucesso" });
//   } catch (erro) {
//     res.status(500).json({ mensagem: "Erro ao deletar odontograma", erro });
//   }
//   }
// };
// Compare this snippet from routes/odontograma.routes.js:
// import express from "express";
// import { createOdontograma, getAllOdontogramas, getOdontogramaById, updateOdontograma, deleteOdontograma } from "../controllers/odontograma.controller.js";
//
// const router = express.Router();
//
// router.route('/')
//     .get(getAllOdontogramas)
//     .post(createOdontograma);
//
// router.route('/:id')