import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Importando o contexto de autenticação

// style
import styles from './Professor.module.css';

// Components
import FormCadastroProfessor from "../../components/Form/FormCadastroProfessor/FormCadastroProfessor";
import GridCadastroProfessor from '../../components/Grid/GridCadastroProfessor/GridCadastroProfessor';

const Professor = () => {
  const [professores, setProfessores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const { isAuthenticated } = useContext(AuthContext); // Verificar se o usuário está autenticado
  const navigate = useNavigate();

  const getProfessores = async () => {
    try {
      const res = await axios.get('http://localhost:8800/professor', {
        headers: {
          'x-access-token': localStorage.getItem('token'), // Inclui o token na requisição
        },
      });
      setProfessores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirecionar para a página de login se não estiver autenticado
    } else {
      getProfessores(); // Carregar os professores se o usuário estiver autenticado
    }
  }, [isAuthenticated, navigate, setProfessores]);

  return (
    <div className={styles.Professor}>
      <div className={styles.Titulo}>Cadastro de Professor</div>
      <FormCadastroProfessor onEdit={onEdit} setOnEdit={setOnEdit} getProfessores={getProfessores} />
      <GridCadastroProfessor setOnEdit={setOnEdit} professores={professores} setProfessores={setProfessores} />
    </div>
  );
}

export default Professor;
