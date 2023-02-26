const express = require('express')
const router = express.Router()


//rota raiz
router.get('/', (req, res) => {
    res.render('index')
})

//rota para cadastrar usuário
router.get('/register', (req, res) => {
    res.render('register')
})



module.exports = router