const conexao = require('./conexao')


/// Classe responsável por fazer um INSERT no Database

class Character {
    adiciona(characters) {
        const sql = 'INSERT INTO Characters SET ?'

        conexao.query(sql, characters, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
            
        })
    }
}

module.exports = new Character