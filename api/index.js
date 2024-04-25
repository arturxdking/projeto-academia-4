import express from "express"
import AlunoRoutes from "./routes/AlunoRoutes.js"
import ExercicioRoutes from "./routes/ExercicioRoutes.js"
import ProfessorRoutes from "./routes/ProfessorRoutes.js"
import FichaTreinoRoutes from "./routes/FichaTreinoRoutes.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())


app.use("/aluno", AlunoRoutes)
app.use("/exercicio", ExercicioRoutes)
app.use("/professor", ProfessorRoutes)
app.use("/fichatreino", FichaTreinoRoutes)

app.listen(8800)