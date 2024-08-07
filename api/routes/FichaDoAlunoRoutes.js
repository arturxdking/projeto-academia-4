import express from "express";
import { getFichaDoAluno } from "../controllers/FichaDoAlunoController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/ficha", verifyToken, getFichaDoAluno);

export default router;
