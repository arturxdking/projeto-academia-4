import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        console.log('useEffect inicializado com token:', token); 
        console.log('useEffect inicializado com role:', storedRole); 
        
        if (token && storedRole) {
            setIsAuthenticated(true);
            setRole(storedRole);
            console.log('Usuário autenticado no useEffect');
        } else {
            setIsAuthenticated(false);
            setRole(null);
            console.log('Usuário não autenticado no useEffect');
        }
    }, []);

    const login = (token, userRole) => {
        console.log('Login chamado com:', { token, userRole });
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        setIsAuthenticated(true);
        setRole(userRole);
        console.log('Token e role salvos no localStorage:', { token, userRole });

        // Redirecionamento com base no papel do usuário
        if (userRole === 'aluno') {
            navigate('/fichadoaluno'); 
        } else if (userRole === 'administrador') {
            navigate('/'); 
        } else {
            navigate('/login'); // Redireciona para login se o papel for desconhecido
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole(null);
        console.log('Usuário deslogado');
        navigate('/login'); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
