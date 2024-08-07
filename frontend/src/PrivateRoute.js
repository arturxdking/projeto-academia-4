import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role === 'aluno' && location.pathname !== '/fichadoaluno') {
    return <Navigate to="/fichadoaluno" />;
  }

  return children;
};

export default PrivateRoute;
