import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); // Adiciona o estado para o papel do usuário
    const navigate = useNavigate(); // useNavigate usado dentro do contexto de um Router

    const login = (token, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole); // Armazena o papel do usuário no localStorage
        setIsAuthenticated(true);
        setRole(userRole);
        navigate('/'); // Redireciona após login
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Remove o papel do usuário no logout
        setIsAuthenticated(false);
        setRole(null);
        navigate('/login'); // Redireciona após logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
