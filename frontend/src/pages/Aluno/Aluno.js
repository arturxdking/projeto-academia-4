import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// style
import styles from './Aluno.module.css';

// Components
import FormCadastroAluno from "../../components/Form/FormCadastroAluno/FormCadastroAluno";
import GridCadastroAluno from '../../components/Grid/GridCadastroAluno/GridCadastroAluno';

const Aluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getAlunos = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:8800/aluno', {
        headers: {
          'x-access-token': token,
        },
      });
      setAlunos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAlunos();
  }, [setAlunos]);

  return (
    <>
      <div className={styles.Aluno}>
        <div className={styles.Titulo}>Cadastro de Aluno</div>
        <FormCadastroAluno onEdit={onEdit} setOnEdit={setOnEdit} getAlunos={getAlunos} />
        <GridCadastroAluno setOnEdit={setOnEdit} alunos={alunos} setAlunos={setAlunos} />
      </div>
    </>
  );
}

export default Aluno;
