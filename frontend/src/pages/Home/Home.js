// /frontend/src/pages/Home/Home.js
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.home}>
      <h1>Bem-vindo ao Sistema de Ficha de Treino</h1>
      <p>Gerencie suas fichas de treino de forma fácil e eficiente.</p>
    </div>
  );
};

export default Home;
