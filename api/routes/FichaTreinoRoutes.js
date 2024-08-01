import express from "express";
import { getFichaTreino, postFichaTreino } from "../controllers/FichaTreinoController.js";
import { verifyToken } from "../middleware/auth.js"; // Importando o middleware de autenticação

const router = express.Router()

router.get("/", verifyToken, getFichaTreino)
router.post("/", verifyToken, postFichaTreino)

export default router