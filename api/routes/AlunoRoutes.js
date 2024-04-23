import express from "express";
import { getAluno, postAluno, updateAluno, deleteAluno } from "../controllers/AlunoController.js";

const router = express.Router()

router.get("/", getAluno)

router.post("/", postAluno)

router.put("/:id", updateAluno)

router.delete("/:id", deleteAluno)

export default router