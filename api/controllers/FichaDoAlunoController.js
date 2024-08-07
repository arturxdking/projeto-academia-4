import { db } from "../db.js";

export const getFichaDoAluno = (req, res) => {
    const alunoId = req.userId;
    console.log('Aluno ID:', alunoId); // Log para verificar o ID do aluno

    const q = "SELECT fichatreino FROM alunos WHERE id = ?";

    db.query(q, [alunoId], (err, data) => {
        if (err) {
            console.log('Erro ao buscar a ficha de treino:', err); // Log de erro
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            console.log('Nenhuma ficha de treino encontrada para o aluno:', alunoId); // Log se não houver ficha
            return res.status(404).json({ message: 'Ficha de treino não encontrada' });
        }

        let fichaTreino = data[0].fichatreino;
        console.log('Ficha de treino encontrada:', fichaTreino); // Log para verificar a ficha de treino

        if (fichaTreino) {
            try {
                fichaTreino = JSON.parse(fichaTreino);
            } catch (parseError) {
                console.log('Erro ao parsear a ficha de treino:', parseError); // Log de erro de parsing
                return res.status(500).json({ message: "Erro ao parsear ficha de treino" });
            }
        }

        return res.status(200).json(fichaTreino);
    });
};
