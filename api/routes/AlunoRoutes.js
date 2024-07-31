import express from "express";
import { getAluno, getAlunoById, postAluno, updateAluno, deleteAluno } from "../controllers/AlunoController.js";
import { verifyToken } from "../middleware/auth.js"; // Importando o middleware de autenticação

const router = express.Router();

router.get("/", verifyToken, getAluno);
router.get("/:id", verifyToken, getAlunoById);
router.post("/", verifyToken, postAluno);
router.put("/:id", verifyToken, updateAluno);
router.delete("/:id", verifyToken, deleteAluno);

export default router;
