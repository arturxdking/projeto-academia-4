import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Components
import FormCadastroAluno from "../../components/Form/FormCadastroAluno";
import GridCadastroAluno from '../../components/Grid/GridCadastroAluno';

const Aluno = () => {

    const [alunos, setAlunos] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getAlunos = async () => {

        try {

            const res = await axios.get('http://localhost:8800/aluno');

            setAlunos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));

        } catch (error) {

            toast.error(error);

        }
    };

    useEffect(() => {
        getAlunos();
    }, [setAlunos]);

    return (
        <>
            <div>
                <div>Cadastro de Aluno</div>
                <FormCadastroAluno onEdit={onEdit} setOnEdit={setOnEdit} getAlunos={getAlunos} />
                <GridCadastroAluno setOnEdit={setOnEdit} alunos={alunos} setAlunos={setAlunos} />
            </div>
        </>
    );
}

export default Aluno;
