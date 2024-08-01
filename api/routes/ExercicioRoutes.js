import express from "express";
import { postExercicio, deleteExercicio, getExercicio, updateExercicio } from "../controllers/ExercicioController.js";
import { verifyToken } from "../middleware/auth.js"; // Importando o middleware de autenticação

const router = express.Router()

// Protegendo as rotas com o middleware verifyToken
router.get("/", verifyToken, getExercicio)
router.post("/", verifyToken, postExercicio)
router.put("/:id", verifyToken, updateExercicio)
router.delete("/:id", verifyToken, deleteExercicio)

export default router
