// /frontend/src/pages/Login/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8800/login', { email, password });
            login(res.data.token); // Chamar a função login com o token recebido
        } catch (error) {
            alert('Credenciais inválidas');
        }
    };

    return (
        <div className={styles.loginAdmin}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
