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

    const handleExercicioChange = async (dia, id, exercicioSelecionado) => {
        const updatedExercicios = exerciciosPorDia[dia].map(ex => {
            if (ex.id === id) {
                return { ...ex, nome: exercicioSelecionado };
            }
            return ex;
        });
        setExerciciosPorDia({ ...exerciciosPorDia, [dia]: updatedExercicios });

        try {
            await axios.put(`http://localhost:8800/aluno/${alunoId}`, {
                fichatreino: { ...exerciciosPorDia, [dia]: updatedExercicios }
            });
        } catch (error) {
            console.error('Erro ao enviar dados para a API', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/aluno/${alunoId}`, {
                fichatreino: exerciciosPorDia
            });
            alert('Ficha de treino atualizada com sucesso!');
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
                                {exerciciosPorDia[dia].map((exercicio, index) => (
                                    <div className='grupo-exercicio-esp' key={exercicio.id}>
                                        <button type="button" onClick={() => handleRemoveExercicio(dia, exercicio.id)}>-</button>
                                        <select className='exercicio' value={exercicio.nome || ''} onChange={(e) => handleExercicioChange(dia, exercicio.id, e.target.value)}>
                                            <option value="" disabled>Selecione um exercício</option>
                                            {exercicios.map(exercicio => (
                                                <option key={exercicio.id} value={exercicio.nome}>{exercicio.nome}</option>
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
            <label>
                ID do Aluno:
                <input type="text" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} />
            </label>
            <button className="botao" type="submit">Salvar</button>
        </form>
    );
};

export default FormFichaTreino;
