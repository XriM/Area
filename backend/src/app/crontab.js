var cron = require('node-cron')
var weather = require('weather-js')
const { pool } = require('../dbConfig')

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

exports.crontabHandler = async (req, res) => {
    // commentary means it's waiting for the front json

    //const body = req.body;

    //if ('city' in  body) {
        cron.schedule('*/2 * * * *', () => {
            const city = "Paris, FR" // Buffer.from(body.city.data, 'base64')
            weather.find({search: city, degreeType: 'C'}, function(err, result) {
                if(err) console.log(err);
                //console.log(JSON.stringify(result, null, 2));
                if (res.current.temperature.parseInt() < 10 || res.current.temperature.parseInt > 20) {
                    var notifier = getIdsFromActionAndData("Weather changed", city)
                }
            //})
            console.log("CRONED") //debug
        })
    })
    return res.status(200).send({ message: "test reussi"}) //debug
}