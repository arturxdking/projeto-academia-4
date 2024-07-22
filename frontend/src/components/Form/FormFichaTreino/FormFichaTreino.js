import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FormFichaTreino.module.css';

const diasDaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

const FormFichaTreino = () => {
    const [exercicios, setExercicios] = useState([]);
    const [alunoId, setAlunoId] = useState('');
    const [diaAtual, setDiaAtual] = useState(0);
    const [exerciciosPorDia, setExerciciosPorDia] = useState({
        'Domingo': [],
        'Segunda-Feira': [],
        'Terça-Feira': [],
        'Quarta-Feira': [],
        'Quinta-Feira': [],
        'Sexta-Feira': [],
        'Sábado': []
    });

    useEffect(() => {
        axios.get('http://localhost:8800/exercicio')
            .then(response => {
                setExercicios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar exercícios', error);
            });
    }, []);

    const handleAddExercicio = (dia) => {
        const novoExercicio = {
            id: Date.now(),
            nome: '',  
            serie: '',  
            repeticao: ''  
        };
        setExerciciosPorDia(prev => ({
            ...prev,
            [dia]: [...prev[dia], novoExercicio]
        }));
    };

    const handleInputChange = (e, dia, id, campo) => {
        const novoValor = campo === 'nome' ? e.target.value : parseInt(e.target.value);
        const exerciciosAtualizados = exerciciosPorDia[dia].map(exercicio => {
            if (exercicio.id === id) {
                return { ...exercicio, [campo]: novoValor };
            }
            return exercicio;
        });

        setExerciciosPorDia(prev => ({
            ...prev,
            [dia]: exerciciosAtualizados
        }));
    };

    const handleRemoveExercicio = (dia, id) => {
        setExerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].filter(ex => ex.id !== id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fichaTreino = {};
            Object.keys(exerciciosPorDia).forEach(dia => {
                fichaTreino[dia] = exerciciosPorDia[dia].map(exercicio => ({
                    nome: exercicio.nome,
                    serie: exercicio.serie,
                    repeticao: exercicio.repeticao
                })).filter(exercicio => exercicio.nome !== '');  
            });

            const response = await axios.put(`http://localhost:8800/aluno/${alunoId}`, {
                fichatreino: fichaTreino
            });
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao enviar ficha de treino', error);
        }
    };

    const diaAnterior = () => {
        setDiaAtual((prevDia) => (prevDia === 0 ? diasDaSemana.length - 1 : prevDia - 1));
    };

    const proximoDia = () => {
        setDiaAtual((prevDia) => (prevDia === diasDaSemana.length - 1 ? 0 : prevDia + 1));
    };

    const diaSelecionado = diasDaSemana[diaAtual];

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>
                <div className={styles.navegacao}>
                    <button type="button" onClick={diaAnterior} className={styles.botaoNavegacao}>{"<"}</button>
                    <div className={styles.tituloDia}>{diaSelecionado}</div>
                    <button type="button" onClick={proximoDia} className={styles.botaoNavegacao}>{">"}</button>
                </div>
                <div className={styles.dia}>
                    <div className={styles.grupoExercicio}>
                        {exerciciosPorDia[diaSelecionado].length === 0 ? (
                            <button type="button" onClick={() => handleAddExercicio(diaSelecionado)}>Adicionar Exercício</button>
                        ) : exerciciosPorDia[diaSelecionado].map((exercicio, index) => (
                            <div className={styles.grupoExercicioEsp} key={exercicio.id}>
                                <button type="button" onClick={() => handleRemoveExercicio(diaSelecionado, exercicio.id)}>-</button>
                                <select className={styles.exercicio} value={exercicio.nome} onChange={(e) => handleInputChange(e, diaSelecionado, exercicio.id, 'nome')}>
                                    <option value="" disabled>Selecione um exercício</option>
                                    {exercicios.map(ex => (
                                        <option key={ex.id} value={ex.nome}>{ex.nome}</option>
                                    ))}
                                </select>
                                <input className={styles.inputSeries} type='number' value={exercicio.serie} onChange={(e) => handleInputChange(e, diaSelecionado, exercicio.id, 'serie')} placeholder='Series' />
                                <input className={styles.inputRepeticoes} type='number' value={exercicio.repeticao} onChange={(e) => handleInputChange(e, diaSelecionado, exercicio.id, 'repeticao')} placeholder='Repetições' />
                                <button type="button" onClick={() => handleAddExercicio(diaSelecionado)}>+</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <label>
                ID do Aluno:
                <input type="text" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} />
            </label>
            <button className={styles.botao} type="submit">Salvar</button>
        </form>
    );
};

export default FormFichaTreino;
