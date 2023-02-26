const express = require('express');
const database = require('./models/conectionDatabase')
const router = require('./routers/router')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use('/auth', require('./routers/auth'))

//configurações para renderizar o html
const path = require('path')
const publicDirectory = path.join(__dirname, './public/')
app.use(express.static(publicDirectory))
app.set('view engine', 'hbs')

module.exports = app;