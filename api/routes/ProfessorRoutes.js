import express from "express";
import { postProfessor, deleteProfessor, getProfessor, updateProfessor } from "../controllers/ProfessorController.js";
import { verifyToken } from "../middleware/auth.js"; // Importando o middleware de autenticação

const router = express.Router()

router.get("/", verifyToken, getProfessor)
router.post("/", verifyToken, postProfessor)
router.put("/:id", verifyToken, updateProfessor)
router.delete("/:id", verifyToken, deleteProfessor)

export default router