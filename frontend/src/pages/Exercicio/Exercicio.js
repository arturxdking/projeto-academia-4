import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// styles
import './Exercicio.css'

// components
import FormCadastroExercicio from '../../components/Form/FormCadastroExercicio';
import GridCadastroExercicio from '../../components/Grid/GridCadastroExercicio';

const Exercicio = () => {

    const [exercicios, setExercicios] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getExercicios = async () => {

        try {

            const res = await axios.get('http://localhost:8800/exercicio');

            setExercicios(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));

        } catch (error) {

            toast.error(error);

        }
    };

    useEffect(() => {
        getExercicios();
    }, [setExercicios]);

    return (
        <>
            <div>
                <div>Cadastro de Exercícios</div>
                <FormCadastroExercicio onEdit={onEdit} setOnEdit={setOnEdit} getExercicios={getExercicios} />
                <GridCadastroExercicio setOnEdit={setOnEdit} exercicios={exercicios} setExercicios={setExercicios} />
            </div>
        </>
    )
}

export default Exercicio;