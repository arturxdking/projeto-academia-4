import express from 'express';
import AlunoRoutes from './routes/AlunoRoutes.js';
import ExercicioRoutes from './routes/ExercicioRoutes.js';
import ProfessorRoutes from './routes/ProfessorRoutes.js';
import FichaTreinoRoutes from './routes/FichaTreinoRoutes.js';
import LoginRoutes from './routes/LoginRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/aluno', AlunoRoutes);
app.use('/exercicio', ExercicioRoutes);
app.use('/professor', ProfessorRoutes);
app.use('/fichatreino', FichaTreinoRoutes);
app.use('/', LoginRoutes); // Depois dessa alteração funcionou


app.listen(8800, () => {
    console.log('Servidor rodando na porta 8800');
});
