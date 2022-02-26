var cron = require('node-cron')
var weather = require('openweather-apis')
var ccxt = require('ccxt')
const { pool } = require('../dbConfig')
const { env } = require('dotenv').config()
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const axios = require('axios')
const fetch = require('node-fetch')
const querystring = require('query-string')
const { getHookGitHub } =require('./hook')


////////////////////////////////////////////
/////
/////   Generic Functions for the file
/////
/////////////////////////////////////////////

getIdsFromActionAndData = async (actionName, data) => {
    let actionId = await pool.query('SELECT id FROM actions WHERE name = $1', [actionName])
    actionId = actionId.rows[0].id
    const areaList = await pool.query('SELECT id FROM areas WHERE action_id = $1', [actionId])
    let list = [];
    for (const res of areaList.rows) {
        list.push(res.id)
    }
    const userList = await pool.query('SELECT user_id FROM user_area WHERE area_id = ANY($1::int[])', [list])
    console.log("userList: ")
    console.log(userList)
}

////////////////////////////////////////////
/////
/////   No Generic Functions for the file
/////
/////////////////////////////////////////////


checkIfWeather = async (body, res) => {

    const city = "Paris" // Buffer.from(body.city.data, 'base64')
    weather.setLang('fr')
    weather.setCity(city)
    weather.setUnits('metric')
    weather.setAPPID(process.env.WEATHER_APPID)

    //if ('weather' in  body) {
        cron.schedule('*/2 * * * *', () => {
            weather.getSmartJSON(function(err, smart) {
                console.log(smart) //debug
                if (smart.temp.parseInt() < 10 || smart.temp.parseInt > 20) {
                    //var notifier = getIdsFromActionAndData("Weather changed", city)
                    }
                })
            console.log("CRONED Weather") //debug
            })
        //})
    //})
}

checkIfCrypto = async (body, res) => {
    // ici c'est le bitcoigne

    let kraken = new ccxt.kraken()

    //if ('crypto' in  body) {
        cron.schedule('*/2* * * *', () => {
            kraken.fetchTicker('BTC/USDT').then(data  => {
                pair = data.symbol
                pourcent = data.percentage
                vwap = data.vwap
                //if (pourcent > 5 || pourcent < 0) {
                    getIdsFromActionAndData("CryptoCurrency price changed", pair)
                //}
                console.log(data)
            })
            //console.log("CRONED Crypto") //debug
        })
    //})
}


exports.crontabsHandler = async (req, res) => {
    // commentary means it's waiting for the front json
    console.log("welcome in crontabs handler")
    const body = req.body;

    //checkIfWeather(body, res)  // working
    //checkIfCrypto(body, res) // working
    getHookGitHub(body, res)

    return res.status(200).send({ message: "crontabs ended well"}) //debug
}