import express from "express";
import { getFichaTreino, postFichaTreino } from "../controllers/FichaTreinoController.js";

const router = express.Router()

router.get("/", getFichaTreino)

router.post("/", postFichaTreino)

export default router