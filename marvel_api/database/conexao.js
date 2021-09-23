const mysql = require('mysql')
require('dotenv/config')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.DB_CONNECTION,
    database: 'marvel'
})

module.exports = conexao