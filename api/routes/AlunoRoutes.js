import express from "express";
import { getAluno, getAlunoById, postAluno, updateAluno,  deleteAluno } from "../controllers/AlunoController.js";

const router = express.Router()

router.get("/", getAluno)

router.get("/:id", getAlunoById)

router.post("/", postAluno)

router.put("/:id", updateAluno)


router.delete("/:id", deleteAluno)

export default router