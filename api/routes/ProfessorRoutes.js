import express from "express";
import { postProfessor, deleteProfessor, getProfessor, updateProfessor } from "../controllers/ProfessorController.js";

const router = express.Router()

router.get("/", getProfessor)

router.post("/", postProfessor)

router.put("/:id", updateProfessor)

router.delete("/:id", deleteProfessor)

export default router