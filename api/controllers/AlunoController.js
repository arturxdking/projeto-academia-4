import { db } from "../db.js";

// metodo GET para resgatar todos os alunos
export const getAluno = (_, res) => {

  const q = "SELECT * FROM alunos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// metodo POST para criar um novo aluno
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
    JSON.stringify(req.body.fichatreino),
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Aluno cadastrado com sucesso.");
  });
};

// metodo GET para resgatar um aluno por ID
export const getAlunoById = (req, res) => {
  const alunoId = req.params.id;
  const q = "SELECT * FROM alunos WHERE id = ?";

  db.query(q, [alunoId], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    return res.status(200).json({
      ...data[0],
      fichatreino: JSON.parse(data[0].fichatreino) // Converter para objeto JSON
    });

  });
};

// Método PUT para editar ou atualizar informações de um aluno
export const updateAluno = (req, res) => {
  const alunoId = req.params.id;
  const { nome, cpf, data_nascimento, sexo, email, telefone, cep, estado, cidade, rua, numero, fichatreino } = req.body;

  // Verificar se a ficha de treino está presente no corpo da requisição
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


// metodo DELETE para deletar o registro de um aluno
export const deleteAluno = (req, res) => {

  const q = "DELETE FROM alunos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Aluno deletado com sucesso.");
  });
};