import React from 'react'

// components
import FormFichaTreino from '../../components/Form/FormFichaTreino/FormFichaTreino';
import FormBuscaAluno from '../../components/Form/FormBuscaAluno/FormBuscaAluno';

const FichaTreino = () => {
    return (
        <>
            <div>Ficha de Treino</div>
            <FormBuscaAluno />
            <FormFichaTreino />
        </>
    )
}

export default FichaTreino