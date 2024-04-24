import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import "./FormCadastroProfessor.css";

const FormCadastroProfessor = ({ getProfessores, onEdit, setOnEdit }) => {

  const ref = useRef();

  useEffect(() => {

    if (onEdit) {

      const professor = ref.current;

      professor.nome.value = onEdit.nome;
      professor.cpf.value = onEdit.cpf;
      professor.cref.value = onEdit.cref;
      professor.data_nascimento.value = onEdit.data_nascimento.split("T")[0];
      professor.sexo.value = onEdit.sexo;
      professor.email.value = onEdit.email;
      professor.telefone.value = onEdit.telefone;
      professor.cep.value = onEdit.cep;
      professor.estado.value = onEdit.estado;
      professor.cidade.value = onEdit.cidade;
      professor.rua.value = onEdit.rua;
      professor.numero.value = onEdit.numero;

    }

  }, [onEdit]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const professor = ref.current;

    if (
      !professor.nome.value ||
      !professor.cpf.value ||
      !professor.cref.value ||
      !professor.data_nascimento.value ||
      !professor.sexo.value ||
      !professor.email.value ||
      !professor.telefone.value ||
      !professor.cep.value ||
      !professor.estado.value ||
      !professor.cidade.value ||
      !professor.rua.value ||
      !professor.numero.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/professor/" + onEdit.id, {
          nome: professor.nome.value,
          cpf: professor.cpf.value,
          cref: professor.cref.value,
          data_nascimento: professor.data_nascimento.value,
          sexo: professor.sexo.value,
          email: professor.email.value,
          telefone: professor.telefone.value,
          cep: professor.cep.value,
          estado: professor.estado.value,
          cidade: professor.cidade.value,
          rua: professor.rua.value,
          numero: professor.numero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/professor", {
          nome: professor.nome.value,
          cpf: professor.cpf.value,
          cref: professor.cref.value,
          data_nascimento: professor.data_nascimento.value,
          sexo: professor.sexo.value,
          email: professor.email.value,
          telefone: professor.telefone.value,
          cep: professor.cep.value,
          estado: professor.estado.value,
          cidade: professor.cidade.value,
          rua: professor.rua.value,
          numero: professor.numero.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    professor.nome.value = "";
    professor.cpf.value = "";
    professor.cref.value = "";
    professor.data_nascimento.value = "";
    professor.sexo.value = "";
    professor.email.value = "";
    professor.telefone.value = "";
    professor.cep.value = "";
    professor.estado.value = "";
    professor.cidade.value = "";
    professor.rua.value = "";
    professor.numero.value = "";

    setOnEdit(null);
    getProfessores();
  };

  return (
    <form className="formulario" ref={ref} onSubmit={handleSubmit}>

      <div className="dados_pessoais">
        <div className="campo">
          <label>Nome do Professor</label>
          <input className="input" name="nome" type="text" placeholder="Nome completo" />
        </div>
        <div className="campo">
          <label>CPF</label>
          <input className="input" name="cpf" type="text" />
        </div>
        <div className="campo">
          <label>CREF</label>
          <input className="input" name="cref" type="text" />
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

export default FormCadastroProfessor;