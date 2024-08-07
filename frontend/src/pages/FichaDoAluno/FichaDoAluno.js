import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './FichaDoAluno.module.css';

const FichaDoAluno = () => {
    const [ficha, setFicha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8800/fichadoaluno/ficha', {
            headers: {
                'x-access-token': token
            }
        })
        .then(response => {
            console.log('Dados da ficha recebidos:', response.data); // Log para verificar os dados recebidos
            setFicha(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log('Erro ao carregar a ficha de treino:', error); // Log de erro
            setError('Erro ao carregar a ficha de treino');
            setLoading(false);
        });
    }, [navigate]);

    if (loading) {
        return <div className={styles.container}>Carregando...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    if (!ficha || Object.keys(ficha).length === 0) {
        return <div className={styles.container}>Nenhuma ficha de treino encontrada.</div>;
    }

    return (
        <div className={styles.container}>
            {Object.keys(ficha).map((dia, index) => (
                <div key={index}>
                    <h2 className={styles.day}>{dia}</h2>
                    {ficha[dia].length > 0 ? (
                        ficha[dia].map((exercicio, i) => (
                            <div key={i} className={styles.exercicioContainer}>
                                <div className={styles.exercicioInfo}>
                                    <h3 className={styles.exercicioName}>{exercicio.nome}</h3>
                                    <p className={styles.exercicioDetail}>Séries: {exercicio.serie}</p>
                                    <p className={styles.exercicioDetail}>Repetições: {exercicio.repeticao}</p>
                                </div>
                                <div className={styles.exercicioSet}>
                                    <p>10-12-14</p>
                                    <p>25Kg</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noExercise}>Nenhum exercício para este dia.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FichaDoAluno;
