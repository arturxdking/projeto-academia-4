import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./FormCadastroAluno.module.css";

const estadosBrasil = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

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
      aluno.senha.value = onEdit.senha || ""; // Preenche o campo de senha se houver valor
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
      !aluno.numero.value ||
      !aluno.senha.value // Verifica se o campo de senha está preenchido
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const config = {
      headers: {
        'x-access-token': localStorage.getItem('token'), // Inclui o token na requisição
      },
    };

    try {
      if (onEdit) {
        const response = await axios.put(
          `http://localhost:8800/aluno/${onEdit.id}`,
          {
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
            senha: aluno.senha.value // Envia o valor da senha
          },
          config
        );
        toast.success(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:8800/aluno",
          {
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
            senha: aluno.senha.value // Envia o valor da senha
          },
          config
        );
        toast.success(response.data);
      }

      // Reseta os campos do formulário após o envio
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
      aluno.senha.value = ""; // Reseta o campo de senha

      setOnEdit(null);
      getAlunos();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={styles['form-cadastro-aluno-container']}>
      <form className={styles.formulario} ref={ref} onSubmit={handleSubmit}>
        <div className={styles.dados_pessoais_nome_cpf}>
          <div className={`${styles.campo} ${styles.campo_nome}`}>
            <label>Nome do Aluno</label>
            <input className={styles.input} name="nome" type="text" placeholder="Nome completo" />
          </div>
          <div className={`${styles.campo} ${styles.campo_cpf}`}>
            <label>CPF</label>
            <input className={styles.input} name="cpf" type="text" placeholder="000.000.000-00" />
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
          <div className={`${styles.campo} ${styles.campo_senha}`}>
            <label>Senha</label>
            <input className={styles.input} name="senha" type="password" placeholder="Digite uma senha" />
          </div>
        </div>
        <div className={styles['botao-container']}>
          <button className={styles.botao} type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastroAluno;
