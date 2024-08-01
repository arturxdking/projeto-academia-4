import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./FormCadastroExercicio.module.css";

const FormCadastroExercicio = ({ getExercicios, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const exercicio = ref.current;
      exercicio.nome.value = onEdit.nome;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exercicio = ref.current;

    if (!exercicio.nome.value) {
      return toast.warn("Preencha todos os campos!");
    }

    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token'), // Inclui o token na requisição
      },
    };

    try {
      if (onEdit) {
        const response = await axios.put(
          `http://localhost:8800/exercicio/${onEdit.id}`,
          { nome: exercicio.nome.value },
          config
        );
        toast.success(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:8800/exercicio",
          { nome: exercicio.nome.value },
          config
        );
        toast.success(response.data);
      }

      exercicio.nome.value = "";

      setOnEdit(null);
      getExercicios();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={styles['form-cadastro-exercicio-container']}>
      <form className={styles.formulario} ref={ref} onSubmit={handleSubmit}>
        <div className={styles.dados_pessoais}>
          <div className={`${styles.campo} ${styles.campo_nome}`}>
            <label>Nome do Exercício</label>
            <input className={styles.input} name="nome" type="text" placeholder="Digite o nome do exercício" />
          </div>
        </div>
        <div className={styles['botao-container']}>
          <button className={styles.botao} type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastroExercicio;
