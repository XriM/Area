var cron = require('node-cron')
var weather = require('weather-js')
var ccxt = require('ccxt')
const { pool } = require('../dbConfig')
const { sendWhatsApp } = require('./reactions')


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

    //if ('weather' in  body) {
        cron.schedule('*/2 * * * *', () => {
            const city = "Paris, FR" // Buffer.from(body.city.data, 'base64')
            weather.find({search: city, degreeType: 'C'}, function(err, result) {
                if(err) console.log(err);
                //console.log(JSON.stringify(result, null, 2));
                //if (res.current.temperature.parseInt() < 10 || res.current.temperature.parseInt > 20) {
                    var notifier = getIdsFromActionAndData("Weather changed", city)
                //}
            console.log("CRONED Weather") //debug
            })
        })
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

    //checkIfWeather(body, res)  // working
    //checkIfCrypto(body, res) // working
    //checkIf
    console.log("juste avant")
    sendWhatsApp("+33699429473", "Test")

    return res.status(200).send({ message: "crontabs ended well"}) //debug
}