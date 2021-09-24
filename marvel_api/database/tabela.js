class Tabelas {
    init(conexao) {
        console.log('Tabelas foram chamadas')
        this.conexao = conexao   ///passando para dentro do escopo


        this.criarCharacters()    ///criação das tabelas
    
    }

   
    /// Cria uma nova tabela se a mesma não existir.
    
    criarCharacters() {
        const sql = `      
        CREATE TABLE IF NOT EXISTS Characters
        (id int NOT NULL,
        name varchar(50) NOT NULL, 
        comics int NOT NULL, PRIMARY KEY(id))
        `
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Characters criada com sucesso.')
            }
        })
    }
    
}

module.exports = new Tabelas 