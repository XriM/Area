var cron = require('node-cron')
var weather = require('weather-js')
const { pool } = require('../dbConfig')

// async function getIdsFromData(areaName, index, data) {
//     let areaId = await pool.query('SELECT id FROM areas WHERE area_name = $1', [areaName])
//     areaId = areaId.rows[0].id
//     const res = await pool.query('SELECT user_id FROM user_area WHERE area_id = $1', [areaId])
//     console.log("LES ROWS PTITE PUTE: ")
//     console.log(res.rows)
//     return res.rows
// }

exports.crontabHandler = async (req, res) => {
    //const body = req.body;

    //if ('city' in  body) {
        cron.schedule('* */2 * * * *', () => {
            //const city = Buffer.from(body.city.data, 'base64')
            //weather.find({search: 'Paris, FR', degreeType: 'C'}, function(err, result) {
              //  if(err) console.log(err);
                //console.log(JSON.stringify(result, null, 2));
              //})
                //if (res.current.temperature.parseInt() < 10) {
                    //do my things
                    //var notifier = getIdsFromData("weather", "city", "Paris")
                //}
            //})
            console.log("CRONED")
        })
        let actionId = await pool.query('SELECT id FROM actions WHERE name = $1', ['Weather changed'])
        actionId = actionId.rows[0].id
        const areaList = await pool.query('SELECT id FROM areas WHERE action_id = $1', [actionId])
        let list = [];
        for (const res of areaList.rows) {
            list.push(res.id)
        }
        const userList = await pool.query('SELECT user_id FROM user_area WHERE area_id = ANY($1::int[])', [list])
        return res.status(200).send({ message: "test reussi"})
    //}
}