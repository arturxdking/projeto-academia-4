import express from "express";
import { postExercicio, deleteExercicio, getExercicio, updateExercicio } from "../controllers/ExercicioController.js";

const router = express.Router()

router.get("/", getExercicio)

router.post("/", postExercicio)

router.put("/:id", updateExercicio)

router.delete("/:id", deleteExercicio)

export default router