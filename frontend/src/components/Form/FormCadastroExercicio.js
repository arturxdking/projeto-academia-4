import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

// styles
import './FormCadastroAluno.css';

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

        if (
            !exercicio.nome.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/exercicio/" + onEdit.id, {
                    nome: exercicio.nome.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/exercicio", {
                    nome: exercicio.nome.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        exercicio.nome.value = "";

        setOnEdit(null);
        getExercicios();
    };

    return (
        <form className="" ref={ref} onSubmit={handleSubmit}>

            <div className="campo">
                <label>Nome do Exercício</label>
                <input className="input" name="nome" type="text" placeholder="Digite o nome do exercício" />
            </div>

            <button className="botao" type="submit">Salvar</button>
        </form>
    )
}

export default FormCadastroExercicio;