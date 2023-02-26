const mysql = require('mysql2')
require('dotenv').config()

const DB = process.env.MYSQL_DB
const HOST = process.env.MYSQL_HOST
const USER = process.env.MYSQL_USER
const PASSWORD = process.env.MYSQL_PASSWORD

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB
})

db.connect( (error) => {
    if(error){
        console.log("Falha ao conectar ao banco de dados" + '\n' + error)
    } else {
        console.log("Banco de dados conectado")
    }
} )

module.exports = {
    db
}