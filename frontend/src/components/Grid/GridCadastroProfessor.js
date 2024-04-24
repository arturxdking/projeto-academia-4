import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "./GridCadastroProfessor.css";

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
    <table className="Table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {professores.map((item, i) => (
          <tr key={i}>
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

export default GridCadastroProfessor;