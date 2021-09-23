const md5 = require('md5')
const axios = require('axios').default
const fetch = require('fetch')
const http = require('http')
const bodyparser = require('body-parser')


const timestamp = Math.floor(Date.now() / 1000)
const public_key = 'ec6e9aca3c06f5a7cd400daf055649db'
const private_key = 'b5118c62f2821b62bce55f2f19674bbfd8bd24f0'
const hash = md5(timestamp + private_key + public_key)


const url = `http://gateway.marvel.com/v1/public/characters/1011123?ts=${timestamp}&apikey=${public_key}&hash=${hash}`

axios.get(url)
    .then( res => console.log(res.data))
    .catch (error => console.log (error))
    
