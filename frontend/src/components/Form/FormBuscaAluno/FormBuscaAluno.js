import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FormBuscaAluno.module.css';

function FormBuscaAluno({ setAlunoId, setFichaTreino }) {
  const [inputAlunoId, setInputAlunoId] = useState('');
  const [aluno, setAluno] = useState(null);
  const [error, setError] = useState('Aluno não encontrado');

  useEffect(() => {
    if (inputAlunoId !== '') {
      const fetchAluno = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/aluno/${inputAlunoId}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'), // Inclui o token na requisição
            },
          });
          setAluno(response.data);
          setAlunoId(inputAlunoId);
          setFichaTreino(response.data.fichatreino || {});
          setError('');
        } catch (err) {
          setError('Aluno não encontrado');
          setAluno(null);
        }
      };

      fetchAluno();
    }
  }, [inputAlunoId, setAlunoId, setFichaTreino]);

  const handleChange = (e) => {
    setInputAlunoId(e.target.value);
  };

  return (
    <div className={styles['form-busca-aluno-container']}>
      <form className={styles.formulario}>
        <div className={styles.dados_pessoais}>
          <div className={`${styles.campo} ${styles.campo_nome}`}>
            <label>Buscar por aluno</label>
            <input
              className={styles.input}
              name="alunoId"
              type="text"
              value={inputAlunoId}
              onChange={handleChange}
              placeholder="Digite o ID do aluno"
            />
            {aluno && (
              <div className={styles['aluno-info']}>
                <p>CPF: {aluno.cpf}</p>
                <p>Nome: {aluno.nome}</p>
              </div>
            )}
            {error && !aluno && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormBuscaAluno;
