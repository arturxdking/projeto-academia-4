import { db } from "../db.js";

// metodo GET para resgatar todos os professores
export const getProfessor = (_, res) => {

  const q = "SELECT * FROM professor";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// metodo POST para criar um novo professor
export const postProfessor = (req, res) => {

  const q = "INSERT INTO professor(`nome`, `email`, `fone`, `cref`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.cref,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor cadastrado com sucesso.");
  });
};

// metodo PUT para editar ou atualizar informações de um professor
export const updateProfessor = (req, res) => {

  const q = "UPDATE professor SET `nome` = ?, `email` = ?, `fone` = ?, `cref` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.cref,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor atualizado com sucesso.");
  });
};

// metodo DELETE para deletar o registro de um professor 
export const deleteProfessor = (req, res) => {

  const q = "DELETE FROM professor WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor deletado com sucesso.");
  });
};