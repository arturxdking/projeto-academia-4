import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const location = useLocation();

  console.log('Rota acessada:', location.pathname); // Log de depuração
  console.log('Estado de autenticação:', { isAuthenticated, role }); // Log de depuração

  if (!isAuthenticated) {
    console.log('Usuário não autenticado, redirecionando para login.');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Lógica para redirecionar baseado no papel e na rota atual
  if (role === 'aluno' && location.pathname !== '/fichadoaluno') {
    console.log('Usuário aluno tentando acessar outra rota, redirecionando para /fichadoaluno');
    return <Navigate to="/fichadoaluno" />;
  }

  if (role === 'administrador' && location.pathname === '/fichadoaluno') {
    console.log('Administrador tentando acessar rota de aluno, redirecionando para home');
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
