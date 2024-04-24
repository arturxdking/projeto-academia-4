import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Components
import FormCadastroProfessor from "../../components/Form/FormCadastroProfessor";
import GridCadastroProfessor from '../../components/Grid/GridCadastroProfessor';

const Professor = () => {

    const [professores, setProfessores] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getProfessores = async () => {

        try {

            const res = await axios.get('http://localhost:8800/professor');

            setProfessores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));

        } catch (error) {

            toast.error(error);

        }
    };

    useEffect(() => {
        getProfessores();
    }, [setProfessores]);

    return (
        <>
            <div>
                <div>Cadastro de Professor</div>
                <FormCadastroProfessor onEdit={onEdit} setOnEdit={setOnEdit} getProfessores={getProfessores} />
                <GridCadastroProfessor setOnEdit={setOnEdit} professores={professores} setProfessores={setProfessores} />
            </div>
        </>
    );
}

export default Professor;
