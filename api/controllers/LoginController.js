import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const login = (req, res) => {
    console.log('Login endpoint called');
    const { email, password } = req.body;

    // Verifica se o usuário é um administrador
    const qAdmin = 'SELECT * FROM administrador WHERE email = ?';
    db.query(qAdmin, [email], (err, adminData) => {
        if (err) return res.status(500).json(err);
        
        // Se não encontrar como administrador, busca como aluno
        if (adminData.length === 0) {
            const qAluno = 'SELECT * FROM alunos WHERE email = ?';
            db.query(qAluno, [email], (err, alunoData) => {
                if (err) return res.status(500).json(err);
                if (alunoData.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });

                const user = alunoData[0];
                bcrypt.compare(password, user.senha, (err, result) => {
                    if (err) return res.status(500).json({ message: 'Erro interno do servidor' });
                    if (!result) return res.status(401).json({ message: 'Credenciais inválidas' });

                    const token = jwt.sign({ id: user.id, role: 'aluno' }, 'your-secret-key', { expiresIn: 86400 });
                    return res.status(200).json({ message: 'Autenticação bem-sucedida', token, role: 'aluno' });
                });
            });
        } else {
            const user = adminData[0];
            bcrypt.compare(password, user.senha, (err, result) => {
                if (err) return res.status(500).json({ message: 'Erro interno do servidor' });
                if (!result) return res.status(401).json({ message: 'Credenciais inválidas' });

                const token = jwt.sign({ id: user.id, role: 'administrador' }, 'your-secret-key', { expiresIn: 86400 });
                return res.status(200).json({ message: 'Autenticação bem-sucedida', token, role: 'administrador' });
            });
        }
    });
};
