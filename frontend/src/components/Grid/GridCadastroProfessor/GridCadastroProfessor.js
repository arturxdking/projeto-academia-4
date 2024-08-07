import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./GridCadastroProfessor.module.css"; // Use CSS Modules

const GridCadastroProfessor = ({ professores, setProfessores, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/professor/" + id)
      .then(({ data }) => {
        const newArray = professores.filter((professor) => professor.id !== id);
        setProfessores(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Professor</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody>
        {professores.map((item, i) => (
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

export default GridCadastroProfessor;
