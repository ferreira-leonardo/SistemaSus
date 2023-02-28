const mysql = require('mysql2')
const bcrypt = require('bcryptjs') //criptografia
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


const register = (req, res) => {
    const {
        name, 
        cartaoSUS, 
        cpf, 
        dateBirth, 
        sex, 
        address, 
        telephone, 
        email, 
        password,
        passwordConf
    } = req.body

    db.query(`SELECT email FROM paciente WHERE email = '${email}'`, async (error, results) => {
        if(error){
            console.log(error)
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'Este e-mail está em uso'
            })
        } else if(password !== passwordConf){
            return res.render('register', {
                message: 'Senhas não correspondem'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        const values = {cartaoSUS: cartaoSUS, nome: name, cpf: cpf, dataNac: dateBirth, sexo: sex, bairro: address, telefone: telephone, email: email, password: hashedPassword}

        db.query('INSERT INTO paciente SET ?', values, (error, results)=>{
            if(error){
                console.log(error)
            } else{
                console.log(results)
                return res.render('register', {
                    message: 'Usuário registrado'
                })
            }
        })
    })
    
}

module.exports = {register}
