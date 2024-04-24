import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import "./FormCadastroAluno.css";

const FormCadastroAluno = ({ getAlunos, onEdit, setOnEdit }) => {

  const ref = useRef();

  useEffect(() => {

    if (onEdit) {

      const aluno = ref.current;

      aluno.nome.value = onEdit.nome;
      aluno.cpf.value = onEdit.cpf;
      aluno.data_nascimento.value = onEdit.data_nascimento.split("T")[0];
      aluno.sexo.value = onEdit.sexo;
      aluno.email.value = onEdit.email;
      aluno.telefone.value = onEdit.telefone;
      aluno.cep.value = onEdit.cep;
      aluno.estado.value = onEdit.estado;
      aluno.cidade.value = onEdit.cidade;
      aluno.rua.value = onEdit.rua;
      aluno.numero.value = onEdit.numero;

    }

  }, [onEdit]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const aluno = ref.current;

    if (
      !aluno.nome.value ||
      !aluno.cpf.value ||
      !aluno.data_nascimento.value ||
      !aluno.sexo.value ||
      !aluno.email.value ||
      !aluno.telefone.value ||
      !aluno.cep.value ||
      !aluno.estado.value ||
      !aluno.cidade.value ||
      !aluno.rua.value ||
      !aluno.numero.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/aluno/" + onEdit.id, {
          nome: aluno.nome.value,
          cpf: aluno.cpf.value,
          data_nascimento: aluno.data_nascimento.value,
          sexo: aluno.sexo.value,
          email: aluno.email.value,
          telefone: aluno.telefone.value,
          cep: aluno.cep.value,
          estado: aluno.estado.value,
          cidade: aluno.cidade.value,
          rua: aluno.rua.value,
          numero: aluno.numero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/aluno", {
          nome: aluno.nome.value,
          cpf: aluno.cpf.value,
          data_nascimento: aluno.data_nascimento.value,
          sexo: aluno.sexo.value,
          email: aluno.email.value,
          telefone: aluno.telefone.value,
          cep: aluno.cep.value,
          estado: aluno.estado.value,
          cidade: aluno.cidade.value,
          rua: aluno.rua.value,
          numero: aluno.numero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    aluno.nome.value = "";
    aluno.cpf.value = "";
    aluno.data_nascimento.value = "";
    aluno.sexo.value = "";
    aluno.email.value = "";
    aluno.telefone.value = "";
    aluno.cep.value = "";
    aluno.estado.value = "";
    aluno.cidade.value = "";
    aluno.rua.value = "";
    aluno.numero.value = "";

    setOnEdit(null);
    getAlunos();
  };

  return (
    <form className="formulario" ref={ref} onSubmit={handleSubmit}>

      <div className="dados_pessoais">
        <div className="campo">
          <label>Nome do Aluno</label>
          <input className="input" name="nome" type="text" placeholder="Nome completo" />
        </div>
        <div className="campo">
          <label>CPF</label>
          <input className="input" name="cpf" type="text" />
        </div>
        <div className="campo">
          <label>Data de Nascimento</label>
          <input className="input" name="data_nascimento" type="date" />
        </div>
      </div>

      <div className="dados_pessoais_2">
        <div className="campo">
          <label>Sexo</label>
          <select className="input" name="sexo">
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
        <div className="campo">
          <label>E-mail</label>
          <input className="input" name="email" type="email" />
        </div>
        <div className="campo">
          <label>Telefone</label>
          <input className="input" name="telefone" type="text" />
        </div>
      </div>

      <div className="endereco">
        <div className="campo">
          <label>CEP</label>
          <input className="input" name="cep" type="text" />
        </div>
        <div className="campo">
          <label>Estado</label>
          <input className="input" name="estado" type="text" />
        </div>
        <div className="campo">
          <label>Cidade</label>
          <input className="input" name="cidade" type="text" />
        </div>
        <div className="campo">
          <label>Rua</label>
          <input className="input" name="rua" type="text" />
        </div>
        <div className="campo">
          <label>Número</label>
          <input className="input" name="numero" type="text" />
        </div>
      </div>

      <button className="botao" type="submit">Salvar</button>

    </form >
  );
};

export default FormCadastroAluno;