import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redireciona para a página principal ou outra rota protegida
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8800/login', { email, password });
            const { token, role } = res.data;
            login(token, role);
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Credenciais inválidas');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Sistema de Ficha de Treino</h1>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
