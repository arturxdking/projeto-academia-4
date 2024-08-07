import { db } from "../db.js";

// método GET para resgatar todos os alunos
export const getAluno = (_, res) => {
  const q = "SELECT * FROM alunos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// método POST para criar um novo aluno
export const postAluno = (req, res) => {
  const q = "INSERT INTO alunos (`nome`, `cpf`, `data_nascimento`, `sexo`, `email`, `telefone`, `cep`, `estado`, `cidade`, `rua`, `numero`, `fichatreino`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.data_nascimento,
    req.body.sexo,
    req.body.email,
    req.body.telefone,
    req.body.cep,
    req.body.estado,
    req.body.cidade,
    req.body.rua,
    req.body.numero,
    req.body.fichatreino ? JSON.stringify(req.body.fichatreino) : null,
  ];

  console.log("Valores para inserir:", values); // Log dos valores

  db.query(q, [values], (err) => {
    if (err) {
      console.error("Erro ao inserir aluno:", err); // Log do erro
      return res.json(err);
    }

    return res.status(200).json("Aluno cadastrado com sucesso.");
  });
};

// método GET para resgatar um aluno por ID
export const getAlunoById = (req, res) => {
  const alunoId = req.params.id;
  const q = "SELECT * FROM alunos WHERE id = ?";

  db.query(q, [alunoId], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    let fichaTreino = data[0].fichatreino;
    if (fichaTreino) {
      try {
        fichaTreino = JSON.parse(fichaTreino);
      } catch (parseError) {
        return res.status(500).json({ error: "Erro ao parsear ficha de treino" });
      }
    }

    return res.status(200).json({
      ...data[0],
      fichatreino: fichaTreino,
    });
  });
};

// método PUT para editar ou atualizar informações de um aluno
export const updateAluno = (req, res) => {
  const alunoId = req.params.id;
  const { nome, cpf, data_nascimento, sexo, email, telefone, cep, estado, cidade, rua, numero, fichatreino } = req.body;

  if (fichatreino !== undefined) {
    const q = "UPDATE alunos SET `fichatreino` = ? WHERE `id` = ?";
    const values = [JSON.stringify(fichatreino), alunoId];
    db.query(q, values, (err) => {
      if (err) return res.json(err);
      return res.status(200).json("Ficha de treino do aluno atualizada com sucesso.");
    });
  } else {
    const q = `
          UPDATE alunos 
          SET 
              nome = ?,
              cpf = ?,
              data_nascimento = ?,
              sexo = ?,
              email = ?,
              telefone = ?,
              cep = ?,
              estado = ?,
              cidade = ?,
              rua = ?,
              numero = ?
          WHERE id = ?
      `;
    const values = [
      nome,
      cpf,
      data_nascimento,
      sexo,
      email,
      telefone,
      cep,
      estado,
      cidade,
      rua,
      numero,
      alunoId
    ];
    db.query(q, values, (err) => {
      if (err) return res.json(err);
      return res.status(200).json("Informações do aluno atualizadas com sucesso.");
    });
  }
};

// método DELETE para deletar o registro de um aluno
export const deleteAluno = (req, res) => {
  const q = "DELETE FROM alunos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Aluno deletado com sucesso.");
  });
};