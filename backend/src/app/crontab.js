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


exports.checkIfWeather = async (body, res) => {

    const city = Buffer.from(body.city.data, 'base64')
    const temp_min = parseInt(Buffer.from(body.temp_min.data, 'base64'))
    const temp_max = parseInt(Buffer.from(body.temp_max.data, 'base64'))

    weather.setLang('fr')
    weather.setCity(city)
    weather.setUnits('metric')
    weather.setAPPID(process.env.WEATHER_APPID)

    cron.schedule('*/2 * * * *', () => {
        weather.getSmartJSON(function(err, smart) {
            console.log(smart) //debug
            if (smart.temp.parseInt() < temp_min || smart.temp.parseInt > temp_max) {
                    var notifier = getIdsFromActionAndData("Weather changed", city)
                }
            })
        //console.log("CRONED Weather") //debug
        })
}

exports.checkIfCrypto = async (body, res) => {
    // ici c'est le bitcoigne

    const pair = Buffer.from(body.crypto.data, 'base64')
    const value_min = parseInt(Buffer.from(body.value_min.data, 'base64'))
    const value_max = parseInt(Buffer.from(body.value_max.data, 'base64'))

    let kraken = new ccxt.kraken()

    cron.schedule('*/2 * * * *', () => {
        kraken.fetchOHLCV(pair, '1m').then(data  => {
            res = parseInt(Buffer.from(data[0][1]), 'base64')
            if (value_min > res || value_max < res) {
                getIdsFromActionAndData("CryptoCurrency price changed", pair)
            }
            console.log(data)
        })
        //console.log("CRONED Crypto") //debug
    })
}