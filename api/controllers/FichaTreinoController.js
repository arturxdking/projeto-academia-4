import { db } from "../db.js";

// metodo GET para resgatar todas as fichas de treino
export const getFichaTreino = (_, res) => {

    const q = "SELECT * FROM fichatreino";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

// método POST para criar uma nova ficha de treino
export const postFichaTreino = (req, res) => {
    
    // Montando a query SQL
    const q = "INSERT INTO fichatreino (`nome`, `diasemana`) VALUES (?, ?)";

     // Serializando o objeto diasemana para armazenar como uma string JSON no banco de dados
    const values = [
        req.body.nome,
        JSON.stringify(req.body.diasemana),
    ]

    // Executando a query com os valores fornecidos
    db.query(q, values, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Ficha de treino cadastrada com sucesso.");
    });
};