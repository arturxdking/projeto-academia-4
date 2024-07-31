import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const login = (req, res) => {
    console.log('Login endpoint called');
    const { email, password } = req.body;

    const q = 'SELECT * FROM administrador WHERE email = ?';
    db.query(q, [email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });

        const user = data[0];
        bcrypt.compare(password, user.senha, (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro interno do servidor' });
            if (!result) return res.status(401).json({ message: 'Credenciais inválidas' });

            const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: 86400 });
            return res.status(200).json({ message: 'Autenticação bem-sucedida', token });
        });
    });
};
