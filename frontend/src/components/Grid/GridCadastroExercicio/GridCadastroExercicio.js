import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./GridCadastroExercicio.module.css";

const GridCadastroExercicio = ({ exercicios, setExercicios, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token'), // Inclui o token na requisição
      },
    };

    try {
      const response = await axios.delete(`http://localhost:8800/exercicio/${id}`, config);
      const newArray = exercicios.filter((exercicio) => exercicio.id !== id);
      setExercicios(newArray);
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
          <th>Nome do Exercício</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody>
        {exercicios.map((item, i) => (
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

export default GridCadastroExercicio;
