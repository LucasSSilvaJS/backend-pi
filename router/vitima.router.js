import express from "express";
import {
  getAllVitimas,
  getVitimaById,
  createVitima,
  updateVitima,
  deleteVitima,
  addOdontogramaToVitima,
  removeOdontogramaFromVitima,
} from "../controllers/vitima.controller.js";

const router = express.Router();

router.route("/")
    .get(getAllVitimas)
    .post(createVitima);

router.route("/:id")
    .get(getVitimaById)
    .put(updateVitima)
    .delete(deleteVitima);

router.route("/:id/odontograma")
    .post(addOdontogramaToVitima)
    .delete(removeOdontogramaFromVitima);

export default router;

