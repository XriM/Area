var cron = require('node-cron')
var weather = require('weather-js')

function getIdsFromData(areaName, index, data) {
    let areaId = await pool.query('SELECT id FROM areas WHERE area_name = $1', [areaName])
    areaId = areaId.rows[0].id
    const res = await pool.query('SELECT user_id FROM user_area WHERE area_id = $1', [areaId])
    
}

exports.crontabHandler = async (req, res) => {
    const body = req.body;

    if ('city' in  body) {
        cron.schedule('*/2 * * * *', () => {
            const city = Buffer.from(body.city.data, 'base64')
            weather.find({search: city, degreeType: 'C'}, function(err, result) {
                if(err) console.log(err)
                var res = JSON.parse(result)
                if (res.current.temperature.parseInt() < 10) {
                    //do my things
                    var notifier = getIdsFromData("weather", "city", "Paris")
                }
            })
        })
    }
}