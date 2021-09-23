const md5 = require('md5')
const axios = require('axios')
const http = require('http')
const bodyparser = require('body-parser')
const fs = require('fs/promises');
const { stringify } = require('querystring');
const { json } = require('body-parser');
require('dotenv/config')



const timestamp = Math.floor(Date.now() / 1000)
const public_key = 'ec6e9aca3c06f5a7cd400daf055649db'
const private_key = 'b5118c62f2821b62bce55f2f19674bbfd8bd24f0'
const hash = md5(timestamp + private_key + public_key)



async function getCharactersList() {
    
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${public_key}&hash=${hash}&limit=100`
    
    const resposta = await axios.get(url)
    //console.log(JSON.stringify(resposta.data.data.results[0].name, null, 2))
    return console.log(JSON.stringify(resposta.data.data.results[0].name))

}

getCharactersList()

async function getData() {
    
    const url = `http://gateway.marvel.com/v1/public/characters/1011123?ts=${timestamp}&apikey=${public_key}&hash=${hash}`
    
    const resposta = await axios.get(url)
    console.log(JSON.stringify(resposta.data.data.results[0].name, null, 2))
    return JSON.stringify(resposta.data.data.results[0].name, null, 2)
    //return console.log(JSON.stringify(resposta.data.data.results[0].name, null, 2))
    
    
    // .then( res => console.log(res.data.data))
    // .catch (error => console.log (error))
}


async function writeData(){

    fs.writeFile("test.txt", await getData(), function(err) {
        if (err) {
            console.log(err);
        }
    })
}

// getData()

// writeData()



