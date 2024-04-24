import { db } from "../db.js";

// metodo GET para resgatar todos os professores
export const getProfessor = (_, res) => {

  const q = "SELECT * FROM professores";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// metodo POST para criar um novo professor
export const postProfessor = (req, res) => {

  const q = "INSERT INTO professores (`nome`, `cpf`, `cref`, `data_nascimento`, `sexo`, `email`, `telefone`, `cep`, `estado`, `cidade`, `rua`, `numero`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.cref,
    req.body.data_nascimento,
    req.body.sexo,
    req.body.email,
    req.body.telefone,
    req.body.cep,
    req.body.estado,
    req.body.cidade,
    req.body.rua,
    req.body.numero,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor cadastrado com sucesso.");
  });
};

// metodo PUT para editar ou atualizar informações de um professor
export const updateProfessor = (req, res) => {

  const q = "UPDATE professores SET `nome` = ?, `cpf`= ?, `cref`= ?, `data_nascimento` = ?, `sexo`= ?, `email` = ?, `telefone` = ?, `cep` = ?, `estado`= ?, `cidade`= ?, `rua`= ?, `numero`= ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.cref,
    req.body.data_nascimento,
    req.body.sexo,
    req.body.email,
    req.body.telefone,
    req.body.cep,
    req.body.estado,
    req.body.cidade,
    req.body.rua,
    req.body.numero,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor atualizado com sucesso.");
  });
};

// metodo DELETE para deletar o registro de um professor 
export const deleteProfessor = (req, res) => {

  const q = "DELETE FROM professores WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor deletado com sucesso.");
  });
};