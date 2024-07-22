import React, { useState } from 'react';
import axios from 'axios';

function FormBuscaAluno() {
  const [alunoId, setAlunoId] = useState('');
  const [aluno, setAluno] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAlunoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8800/aluno/${alunoId}`);
      setAluno(response.data);
      setError('');
    } catch (err) {
      setError('Aluno não encontrado');
      setAluno(null);
    }
  };

  return (
    <div>
      <h2>Buscar Aluno por ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID do Aluno:
          <input type="text" value={alunoId} onChange={handleChange} />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {aluno && (
        <div>
          <h3>Dados do Aluno:</h3>
          <p>Nome: {aluno.nome}</p>
          <p>CPF: {aluno.cpf}</p>
        </div>
      )}
    </div>
  );
}

export default FormBuscaAluno;