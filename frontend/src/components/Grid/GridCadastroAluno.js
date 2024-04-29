import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "./GridCadastroAluno.css";

const GridCadastroAluno = ({ alunos, setAlunos, setOnEdit }) => {

  const handleEdit = (item) => {

    setOnEdit(item);

  };

  const handleDelete = async (id) => {

    await axios
      .delete("http://localhost:8800/aluno/" + id)
      .then(({ data }) => {

        const newArray = alunos.filter((aluno) => aluno.id !== id);

        setAlunos(newArray);

        toast.success(data);
        
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((item, i) => (
          <tr key={i}>
            <td className="Td" style={{ width: "70%" }}>{item.id}</td>
            <td className="Td" style={{ width: "70%" }}>{item.nome}</td>
            <td className="Td" style={{ width: "30%" }}>
              <FaEdit className="EditButton" onClick={() => handleEdit(item)} />
              <FaTrash className="DeleteButton" onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GridCadastroAluno;