import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "projeto_academia_3"
})
