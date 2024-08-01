import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Importando o contexto de autenticação

// styles
import styles from './Exercicio.module.css';

// components
import FormCadastroExercicio from '../../components/Form/FormCadastroExercicio/FormCadastroExercicio';
import GridCadastroExercicio from '../../components/Grid/GridCadastroExercicio/GridCadastroExercicio';

const Exercicio = () => {
  const [exercicios, setExercicios] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const { isAuthenticated } = useContext(AuthContext); // Verificar se o usuário está autenticado
  const navigate = useNavigate();

  const getExercicios = async () => {
    try {
      const res = await axios.get('http://localhost:8800/exercicio', {
        headers: {
          'x-access-token': localStorage.getItem('token'), // Enviando o token no cabeçalho
        },
      });
      setExercicios(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirecionar para a página de login se não estiver autenticado
    } else {
      getExercicios(); // Carregar os exercícios se o usuário estiver autenticado
    }
  }, [isAuthenticated, navigate, setExercicios]);

  return (
    <div className={styles.Exercicio}>
      <div className={styles.Titulo}>Cadastro de Exercício</div>
      <FormCadastroExercicio onEdit={onEdit} setOnEdit={setOnEdit} getExercicios={getExercicios} />
      <GridCadastroExercicio setOnEdit={setOnEdit} exercicios={exercicios} setExercicios={setExercicios} />
    </div>
  );
};

export default Exercicio;
