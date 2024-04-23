import { db } from "../db.js";

// metodo GET para resgatar todos os exercicios
export const getExercicio = (_, res) => {

  const q = "SELECT * FROM treinos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// metodo POST para criar um novo exercicio
export const postExercicio = (req, res) => {

  const q = "INSERT INTO treinos(`exercicio`, `series`, `repeticoes`) VALUES(?)";

  const values = [
    req.body.exercicio,
    req.body.series,
    req.body.repeticoes,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Exercício criado com sucesso.");
  });
};

// metodo PUT para editar ou atualizar informações de um exercicio
export const updateExercicio = (req, res) => {

  const q = "UPDATE treinos SET `exercicio` = ?, `series` = ?, `repeticoes` = ? WHERE `id` = ?";

  const values = [
    req.body.exercicio,
    req.body.series,
    req.body.repeticoes,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Exercício atualizado com sucesso.");
  });
};

// metodo DELETE para deletar o registro de um exercicio
export const deleteExercicio = (req, res) => {

  const q = "DELETE FROM treinos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Exercício deletado com sucesso.");
  });
};