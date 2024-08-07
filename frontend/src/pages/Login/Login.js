import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Inicializar o hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8800/login', { email, password });
            const { token, role } = res.data;

            // Adicionando logs para depuração
            console.log('Token:', token);
            console.log('Role:', role);

            login(token, role); // Passa o token e o papel (role) ao contexto de autenticação

            // Redireciona o usuário com base no papel
            if (role === 'aluno') {
                navigate('/fichadoaluno'); // Redireciona para a página de ficha do aluno
            } else if (role === 'administrador') {
                navigate('/'); // Redireciona para a home do administrador
            }
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
