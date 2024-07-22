import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// style
import styles from './FichaTreino.module.css';

// Components
import FormFichaTreino from '../../components/Form/FormFichaTreino/FormFichaTreino';
import FormBuscaAluno from '../../components/Form/FormBuscaAluno/FormBuscaAluno';

const FichaTreino = () => {
  const [fichas, setFichas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getFichas = async () => {
    try {
      const res = await axios.get('http://localhost:8800/fichaTreino');
      setFichas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFichas();
  }, [setFichas]);

  return (
    <>
      <div className={styles.FichaTreino}>
        <div className={styles.Titulo}>Ficha de Treino</div>
        <FormBuscaAluno />
        <FormFichaTreino onEdit={onEdit} setOnEdit={setOnEdit} getFichas={getFichas} />
      </div>
    </>
  );
}

export default FichaTreino;
