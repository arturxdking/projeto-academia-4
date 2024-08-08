import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './FichaDoAluno.module.css';

const FichaDoAluno = () => {
    const [ficha, setFicha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleDays, setVisibleDays] = useState({});
    const [completedExercises, setCompletedExercises] = useState(() => {
        const saved = localStorage.getItem('completedExercises');
        return saved ? JSON.parse(saved) : {};
    });

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
            console.log('Dados da ficha recebidos:', response.data);
            setFicha(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log('Erro ao carregar a ficha de treino:', error);
            setError('Erro ao carregar a ficha de treino');
            setLoading(false);
        });
    }, [navigate]);

    const toggleVisibility = (dia) => {
        setVisibleDays(prevState => ({
            ...prevState,
            [dia]: !prevState[dia]
        }));
    };

    const toggleCompletion = (dia, exercicioIndex) => {
        setCompletedExercises(prevState => {
            const updated = {
                ...prevState,
                [dia]: {
                    ...prevState[dia],
                    [exercicioIndex]: !prevState[dia]?.[exercicioIndex]
                }
            };
            localStorage.setItem('completedExercises', JSON.stringify(updated));
            return updated;
        });
    };

    const diasSemanaOrdenados = [
        'domingo', 
        'segunda-feira', 
        'terça-feira', 
        'quarta-feira', 
        'quinta-feira', 
        'sexta-feira', 
        'sábado'
    ];

    const diasOrdenados = ficha 
        ? Object.keys(ficha).sort((a, b) => diasSemanaOrdenados.indexOf(a.toLowerCase()) - diasSemanaOrdenados.indexOf(b.toLowerCase()))
        : [];

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
            {diasOrdenados.map((dia, index) => (
                <div key={index}>
                    <h2
                        className={styles.day}
                        onClick={() => toggleVisibility(dia)}
                        style={{ cursor: 'pointer' }}
                    >
                        {dia}
                    </h2>
                    {visibleDays[dia] && (
                        ficha[dia].length > 0 ? (
                            ficha[dia].map((exercicio, i) => (
                                <div
                                    key={i}
                                    className={`${styles.exercicioContainer} ${completedExercises[dia]?.[i] ? styles.completed : ''}`}
                                >
                                    <div className={styles.exercicioInfo}>
                                        <h3 className={styles.exercicioName}>{exercicio.nome}</h3>
                                        <p className={styles.exercicioDetail}>Séries: {exercicio.serie}</p>
                                        <p className={styles.exercicioDetail}>Repetições: {exercicio.repeticao}</p>
                                    </div>
                                    <div
                                        className={styles.check}
                                        onClick={() => toggleCompletion(dia, i)}
                                    >
                                        {completedExercises[dia]?.[i] ? '✅' : '⬜️'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noExercise}>Nenhum exercício para este dia.</p>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default FichaDoAluno;
