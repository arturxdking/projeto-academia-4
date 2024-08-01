import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './FichaTreino.module.css';

import FormFichaTreino from '../../components/Form/FormFichaTreino/FormFichaTreino';
import FormBuscaAluno from '../../components/Form/FormBuscaAluno/FormBuscaAluno';

const FichaTreino = () => {
  const [fichas, setFichas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [alunoId, setAlunoId] = useState('');
  const [fichaTreino, setFichaTreino] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const getFichas = async () => {
    try {
      const res = await axios.get('http://localhost:8800/fichaTreino', {
        headers: {
          'x-access-token': localStorage.getItem('token'), // Enviando o token no cabeçalho
        },
      });
      setFichas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error('Erro ao buscar fichas de treino');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      getFichas();
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.FichaTreino}>
      <div className={styles.Titulo}>Ficha de Treino</div>
      <FormBuscaAluno setAlunoId={setAlunoId} setFichaTreino={setFichaTreino} />
      <FormFichaTreino alunoId={alunoId} fichaTreino={fichaTreino} onEdit={onEdit} setOnEdit={setOnEdit} getFichas={getFichas} />
    </div>
  );
}

export default FichaTreino;
