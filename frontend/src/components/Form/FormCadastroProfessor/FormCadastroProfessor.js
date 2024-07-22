import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./FormCadastroProfessor.module.css"; // Atualizado para usar CSS Modules

const estadosBrasil = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

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
    <div className={styles['form-cadastro-professor-container']}>
      <form className={styles.formulario} ref={ref} onSubmit={handleSubmit}>
        <div className={styles.dados_pessoais_nome_cpf}>
          <div className={`${styles.campo} ${styles.campo_nome}`}>
            <label>Nome do Professor</label>
            <input className={styles.input} name="nome" type="text" placeholder="Nome completo" />
          </div>
          <div className={`${styles.campo} ${styles.campo_cpf}`}>
            <label>CPF</label>
            <input className={styles.input} name="cpf" type="text" placeholder="000.000.000-00" />
          </div>
          <div className={`${styles.campo} ${styles.campo_cref}`}>
            <label>CREF</label>
            <input className={styles.input} name="cref" type="text" placeholder="00000-00"/>
          </div>
          <div className={`${styles.campo} ${styles.campo_nascimento}`}>
            <label>Nascimento</label>
            <input className={styles.input} name="data_nascimento" type="date" />
          </div>
          <div className={`${styles.campo} ${styles.campo_sexo}`}>
            <label>Sexo</label>
            <select className={styles.input} name="sexo">
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
        </div>

        <div className={styles.endereco1}>
          <div className={`${styles.campo} ${styles.campo_cep}`}>
            <label>CEP</label>
            <input className={styles.input} name="cep" type="text" placeholder="00000-000" />
          </div>
          <div className={`${styles.campo} ${styles.campo_estado}`}>
            <label>Estado</label>
            <select className={styles.input} name="estado">
              {estadosBrasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
          <div className={`${styles.campo} ${styles.campo_cidade}`}>
            <label>Cidade</label>
            <input className={styles.input} name="cidade" type="text" />
          </div>
          <div className={`${styles.campo} ${styles.campo_rua}`}>
            <label>Rua</label>
            <input className={styles.input} name="rua" type="text" />
          </div>
          <div className={`${styles.campo} ${styles.campo_numero}`}>
            <label>Número</label>
            <input className={styles.input} name="numero" type="text" placeholder="0000" />
          </div>
        </div>
        <div className={styles.dados_pessoais_email_telefone}>
          <div className={`${styles.campo} ${styles.campo_email}`}>
            <label>E-mail</label>
            <input className={styles.input} name="email" type="email" placeholder="exemplo@gmail.com" />
          </div>
          <div className={`${styles.campo} ${styles.campo_telefone}`}>
            <label>Telefone</label>
            <input className={styles.input} name="telefone" type="text" placeholder="0000000000"/>
          </div>
        </div>

        <div className={styles['botao-container']}>
          <button className={styles.botao} type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastroProfessor;
