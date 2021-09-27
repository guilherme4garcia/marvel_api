const md5 = require('md5')
const axios = require('axios')
const fs = require('fs/promises');
const conexao = require('./database/conexao')
const tabelas = require('./database/tabela')
const Character = require('./database/insert');
require('dotenv/config')


/// log de conexao com o banco

conexao.connect((erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('Conectado com sucesso')

        tabelas.init(conexao)
    }
})



/// variaveis para autenticação na API

const timestamp = Math.floor(Date.now() / 1000)
const public_key = 'ec6e9aca3c06f5a7cd400daf055649db'
const private_key = process.env.PRIVATE_KEY
const hash = md5(timestamp + private_key + public_key)



let urls = []
for(let offset = 0; offset <= 1500; offset += 100)
{
    urls.push(axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${public_key}&hash=${hash}&limit=100&offset=${offset}`))
}



Promise.all(urls)
.then((resposta) => {
    
    let obj_dados = {
        dados: [

        ]
    }
    
    
    resposta.forEach(element => {
        element.data.data.results.forEach(element => {
            
            obj_dados.dados.push({id: element.id, name: element.name, comics: element.comics.available})

            Character.adiciona({id: element.id, name: element.name, comics: element.comics.available})
            
        })
        
    })

    return obj_dados
    
})







async function getCharactersList() {
    
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${public_key}&hash=${hash}&limit=100`
    
    const resposta = await axios.get(url)
    const dados = resposta.data.data.results
    let obj_dados = {
        dados: [

        ]
    }

    dados.forEach(element => {

        obj_dados.dados.push({id: element.id, name: element.name, comics: element.comics.available})

        /// adicionar no DB

        Character.adiciona({id: element.id, name: element.name, comics: element.comics.available})
    });

    obj_dados = JSON.stringify(obj_dados, null, 2)
   
    
    return obj_dados


}


/// outras requisições
async function getData() {
    
    const url = `http://gateway.marvel.com/v1/public/characters/1011123?ts=${timestamp}&apikey=${public_key}&hash=${hash}`
    
    const resposta = await axios.get(url)
    console.log(JSON.stringify(resposta.data.data.results[0].name, null, 2))
    return JSON.stringify(resposta.data.data.results[0].name, null, 2)
    //return console.log(JSON.stringify(resposta.data.data.results[0].name, null, 2))
    
    
    // .then( res => console.log(res.data.data))
    // .catch (error => console.log (error))
}

/// retorna um txt com os dados enviados pela API
async function writeData(){

    fs.writeFile("characters_list.txt", await getAllCharacters(), function(err) {
        if (err) {
            console.log(err);
        }
    })
}






