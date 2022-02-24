var cron = require('node-cron')
var weather = require('openweather-apis')
var ccxt = require('ccxt')
const { pool } = require('../dbConfig')
const { sendWhatsApp } = require('./reactions')
const { env } = require('dotenv').config()
const fetch = require('node-fetch')
const PATH = '/'
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
import axios from 'axios'


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

checkIfGitHub = async (body, res) => {
    //if ('github' in body) {
        const CODE = body.CODE
        const githubtoken = await axios.get('https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${CODE}').then((res) => res.data).catch((error) => {
            throw error
        })

        const decoded = querystring.parse(githubToken)
        const accessToken = decoded.access_token

        axios.get("https://api.github.com/user", {
            headers: { Authorization: 'Bearer ${accessToken}' },
            }).then((res) => res.data).catch((error) => {
                console.error('Error getting user from GitHub')
                throw error
            })

            var result = await fetch("https://api.github.com/repos/XriM/BSQ/hooks", { method: 'POST', body: JSON.stringify({
                "name": "web",
                "active": true,
                "events": [
                    "star"
                ],
                "config": {
                    "url": "https://github.com",
                    "content_type": "json",
                    "insecure_ssl": "0"
                }
            }), headers: { Authorization: "Token " + accessToken}})
            result = await result.json()
            console.log(result)
    //}
}


checkIfWeather = async (body, res) => {

    const city = "Paris" // Buffer.from(body.city.data, 'base64')
    weather.setLang('fr')
    weather.setCity(city)
    weather.setUnits('metric')
    weather.setAPPID('c523ccc73b4dd1970acf0dc08262821b')

    //if ('weather' in  body) {
        cron.schedule('*/5 * * * * *', () => {
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
        cron.schedule('*/2 * * * *', () => {
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

    checkIfWeather(body, res)  // working
    //checkIfCrypto(body, res) // working

    return res.status(200).send({ message: "crontabs ended well"}) //debug
}