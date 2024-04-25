import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormFichaTreino.css';

const FormFichaTreino = () => {
    const [exercicios, setExercicios] = useState([]);
    const [diaDaSemana, setDiaDaSemana] = useState("");
    const [exerciciosForm, setExerciciosForm] = useState([{ id: Date.now() }]);

    useEffect(() => {
        axios.get('http://localhost:8800/exercicio')
            .then(response => {
                setExercicios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar exercícios', error);
            });
    }, []);

    const handleAddExercicio = () => {
        setExerciciosForm(exerciciosForm.concat({ id: Date.now() }));
    };

    const handleRemoveExercicio = (id) => {
        if (exerciciosForm.length > 1) {
            setExerciciosForm(exerciciosForm.filter(ex => ex.id !== id));
        }
    };

    return (
        <form>
            <div>
                <div className='campo'>
                    <label>Nome da Ficha de Treino</label>
                    <input className='input' name='nome' type='text' placeholder='Digite o nome da Ficha de Treino' />
                </div>

                <div className='grupo-exercicio'>
                    <div className='dia-semana'>
                        <select value={diaDaSemana} onChange={(e) => setDiaDaSemana(e.target.value)}>
                            <option value="" disabled>Selecione o dia da semana</option>
                            <option value="Domingo">Domingo</option>
                            <option value="Segunda-Feira">Segunda-Feira</option>
                            <option value="Terça-Feira">Terça-Feira</option>
                            <option value="Quarta-Feira">Quarta-Feira</option>
                            <option value="Quinta-Feira">Quinta-Feira</option>
                            <option value="Sexta-Feira">Sexta-Feira</option>
                            <option value="Sábado">Sábado</option>
                        </select>
                    </div>
                    {exerciciosForm.map((exercicio, index) => (
                        <div key={exercicio.id}>
                            <button type="button" onClick={() => handleRemoveExercicio(exercicio.id)} disabled={exerciciosForm.length === 1}>-</button>
                            <select className='exercicio' defaultValue="">
                                <option value="" disabled>Selecione um exercício</option>
                                {exercicios.map(exercicio => (
                                    <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                ))}
                            </select>
                            <input className='' name='series' type='text' placeholder='Series'/>
                            <input className='' name='repeticoes' type='text' placeholder='Repetições'/>
                            <button type="button" onClick={handleAddExercicio}>+</button>
                        </div>
                    ))}
                </div>
            </div>

            <button className="botao" type="submit">Salvar</button>
        </form>
    );
};

export default FormFichaTreino;
