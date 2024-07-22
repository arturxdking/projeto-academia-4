import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormFichaTreino.css';

const FormFichaTreino = () => {
    const [exercicios, setExercicios] = useState([]);
    const [alunoId, setAlunoId] = useState('');
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="semana">
                    {Object.keys(exerciciosPorDia).map(dia => (
                        <div className='dia' key={dia}>
                            <div className='titulo-dia'>{dia}</div>
                            <div className='grupo-exercicio'>
                                {exerciciosPorDia[dia].length === 0 ? (
                                    <button type="button" onClick={() => handleAddExercicio(dia)}>Adicionar Exercício</button>
                                ) : exerciciosPorDia[dia].map((exercicio, index) => (
                                    <div className='grupo-exercicio-esp' key={exercicio.id}>
                                        <button type="button" onClick={() => handleRemoveExercicio(dia, exercicio.id)}>-</button>
                                        <select className='exercicio' value={exercicio.nome} onChange={(e) => handleInputChange(e, dia, exercicio.id, 'nome')}>
                                            <option value="" disabled>Selecione um exercício</option>
                                            {exercicios.map(ex => (
                                                <option key={ex.id} value={ex.nome}>{ex.nome}</option>
                                            ))}
                                        </select>
                                        <input className='input-series' type='number' value={exercicio.serie} onChange={(e) => handleInputChange(e, dia, exercicio.id, 'serie')} placeholder='Series' />
                                        <input className='input-repeticoes' type='number' value={exercicio.repeticao} onChange={(e) => handleInputChange(e, dia, exercicio.id, 'repeticao')} placeholder='Repetições' />
                                        <button type="button" onClick={() => handleAddExercicio(dia)}>+</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <label>
                ID do Aluno:
                <input type="text" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} />
            </label>
            <button className="botao" type="submit">Salvar</button>
        </form>
    );
};

export default FormFichaTreino;
