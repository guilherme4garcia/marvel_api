const mysql = require('mysql')
require('dotenv/config')

///preencher com seus dados de login

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_CONNECTION,
    database: 'marvel_api'
})

module.exports = conexao