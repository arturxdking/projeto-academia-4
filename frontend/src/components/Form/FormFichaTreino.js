import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormFichaTreino.css';

const FormFichaTreino = () => {
    const [exercicios, setExercicios] = useState([]);
    const [exerciciosPorDia, setExerciciosPorDia] = useState({
        Domingo: [{ id: Date.now() }],
        'Segunda-Feira': [{ id: Date.now() }],
        'Terça-Feira': [{ id: Date.now() }],
        'Quarta-Feira': [{ id: Date.now() }],
        'Quinta-Feira': [{ id: Date.now() }],
        'Sexta-Feira': [{ id: Date.now() }],
        Sábado: [{ id: Date.now() }]
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
        const novoExercicio = { id: Date.now() };
        setExerciciosPorDia({
            ...exerciciosPorDia,
            [dia]: [...exerciciosPorDia[dia], novoExercicio]
        });
    };

    const handleRemoveExercicio = (dia, id) => {
        setExerciciosPorDia({
            ...exerciciosPorDia,
            [dia]: exerciciosPorDia[dia].filter(ex => ex.id !== id)
        });
    };

    return (
        <form>
            <div className="container">
                
                <div className="semana">
                    {Object.keys(exerciciosPorDia).map(dia => (
                        <div className='dia' key={dia}>
                            <div className='titulo-dia'>{dia}</div>
                            <div className='grupo-exercicio'>
                                {exerciciosPorDia[dia].map((exercicio, index) => (
                                    <div className='grupo-exercicio-esp' key={exercicio.id}>
                                        <button type="button" onClick={() => handleRemoveExercicio(dia, exercicio.id)}>-</button>
                                        <select className='exercicio' defaultValue="">
                                            <option value="" disabled>Selecione um exercício</option>
                                            {exercicios.map(exercicio => (
                                                <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                            ))}
                                        </select>
                                        <input className='input-series' type='number' placeholder='Series' />
                                        <input className='input-repeticoes' type='number' placeholder='Repetições' />
                                        <button type="button" onClick={() => handleAddExercicio(dia)}>+</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="botao" type="submit">Salvar</button>
        </form>
    );
};

export default FormFichaTreino;
