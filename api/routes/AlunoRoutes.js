import express from "express";
import { getAluno, getAlunoById, postAluno, updateAluno, deleteAluno } from "../controllers/AlunoController.js";
import { verifyToken } from "../middleware/auth.js"; // Importando o middleware de autenticação
import { db } from '../db.js'; // Importando a conexão com o banco de dados

const router = express.Router();

// Nova rota para obter os detalhes do aluno logado
router.get('/me', verifyToken, (req, res) => {
    const userId = req.userId; // O ID do usuário será extraído do token JWT

    const query = "SELECT nome FROM alunos WHERE id = ?";
    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar os dados do aluno' });
        }

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    });
});

// Rota para obter todos os alunos
router.get("/", verifyToken, getAluno);

// Rota para obter um aluno por ID
router.get("/:id", verifyToken, getAlunoById);

// Rota para criar um novo aluno
router.post("/", verifyToken, postAluno);

// Rota para atualizar um aluno por ID
router.put("/:id", verifyToken, updateAluno);

// Rota para deletar um aluno por ID
router.delete("/:id", verifyToken, deleteAluno);

export default router;
