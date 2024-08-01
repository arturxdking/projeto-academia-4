import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./GridCadastroAluno.module.css";

const GridCadastroAluno = ({ alunos, setAlunos, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8800/aluno/${id}`, {
        headers: {
          'x-access-token': token, // Inclui o token na requisição
        },
      });
      const newArray = alunos.filter((aluno) => aluno.id !== id);
      setAlunos(newArray);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setOnEdit(null);
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Aluno</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((item, i) => (
          <tr key={i}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td className={styles.TdActions}>
              <FaEdit className={styles.EditButton} onClick={() => handleEdit(item)} />
            </td>
            <td className={styles.TdActions}>
              <FaTrash className={styles.DeleteButton} onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GridCadastroAluno;
