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
const { sendEmailOutlook, sendDiscordMessage, sendGitIssue } = require('./reactions')
const { error } = require('console')


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

async function triggerReaction(reactionId, token, config)
{
    switch (reactionId) {
        case 1:
            await sendEmailOutlook(token, config);
            break;

        case 2:
            break;

        case 3:
            await sendGitIssue(token, config);
            break;

        case 4:
            await sendDiscordMessage(token, config);
            break;
        default:
            return false
            break;
    }
    return true
}

exports.checkIfWeather = async (req, res, token, reactionToken, reactionId) => {
    if (req.body.device == 'flutter') {
        req.body.config = JSON.parse(req.body.config)
    }
    const city = req.body.config.city
    const temp_min = parseInt(req.body.config.temp_min)
    const temp_max = parseInt(req.body.config.temp_max)

    console.log(req.body)
    console.log(city)
    console.log(temp_min)
    console.log(temp_max)
    weather.setLang('fr')
    weather.setCity(city)
    weather.setUnits('metric')
    weather.setAPPID(process.env.WEATHER_APPID)

    res.status(200).send({ message: 'Area successfully created' })
    cron.schedule('*/2 * * * *', () => {
        weather.getSmartJSON(function(err, smart) {
            console.log(smart) //debug
            if (parseInt(smart.temp) < temp_min || parseInt(smart.temp) > temp_max) {
                triggerReaction(reactionId, reactionToken, req.body.config)
            }
        })
    })
}

exports.checkIfCrypto = async (req, res, token, reactionToken, reactionId) => {
    if (req.body.device == 'flutter') {
        req.body.config = JSON.parse(req.body.config)
    }
    console.log(req.body.config.crypto)
    console.log(req.body.config.value_min)
    console.log(req.body.config.value_max)
    const pair = req.body.config.crypto
    const value_min = parseInt(req.body.config.value_min)
    const value_max = parseInt(req.body.config.value_max)

    let kraken = new ccxt.kraken()

    res.status(200).send({ message: 'Area successfully created' })
    cron.schedule('*/2 * * * *', () => {
        kraken.fetchOHLCV(pair, '1m').then(data  => {
            res = parseFloat(data[0][1])
            if (value_min > res || value_max < res) {
                triggerReaction(reactionId, reactionToken, req.body.config)
            }
            console.log(data)
        }).catch(error => {
            console.log(error)
            throw error;
        })
    })
}

exports.checkIfSteam = async (req, res, token, reactionToken, reactionId) => {
    //req.body.config = JSON.parse(req.body.config)
    if (req.body.device == 'flutter') {
        req.body.config = JSON.parse(req.body.config)
    }
    console.log(req.body.config)
    res.status(200).send({ message: 'Area successfully created' })
    cron.schedule('*/2 * * * *', async () => {
        try {
            var result = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1`, {
                params: { "appid": req.body.config.steam }
            })
            if (result.data.response.player_count < req.body.config.players_min || result.data.response.player_count > req.body.config.players_max) {
                triggerReaction(reactionId, reactionToken, req.body.config)
            }
        } catch (err) {
            throw err;
        }
    })
}

exports.checkIfSubscribe = async (req, res, token, reactionToken, reactionId) => {
    if (req.body.device == 'flutter') {
        req.body.config = JSON.parse(req.body.config)
    }
    //const key = await pool.query('SELECT token FROM user_services WHERE user_id = $1 AND service_id = NEED YOUTUBE SERVICE ID', [userId])
    let subscribers = "";

    console.log(token)
    res.status(200).send({ message: 'Area successfully created' })
    cron.schedule('*/5 * * * * *', () => {
        axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&part=brandingSettings&mine=true", {
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then(result => {
            console.log(result.data)
            subscriberCount = result.data["items"][0]["statistics"]["subscriberCount"];
            if (subscribers === "") {
                subscribers = subscriberCount;
            }
            console.log(subscriberCount + " is now")
            console.log(subscribers + " was before")
            if (subscribers !== subscriberCount) {
                console.log("more subs" + subscriberCount);
                triggerReaction(reactionId, reactionToken, req.body.config)
                //getIdsFromActionAndData("Youtube subscribers changed", subscriberCount)
            }
            subscribers = subscriberCount;
        }).catch(error => {
            console.log()
        })
    });
}

//exports.checkIfNewVideo = async (req, res, token, reactionId) => {
//    if (req.body.device == 'flutter') {
//        req.body.config = JSON.parse(req.body.config)
//    }
//    let videos = ""
//    cron.schedule('*/5 * * * * *', () => {
//        axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&part=brandingSettings&mine=true", {
//            headers: {
//              Authorization: "Bearer " + token,
//            },
//          }).then(result => {
//            console.log(result.data)
//            subscriberCount = result.data["items"][0]["statistics"]["subscriberCount"];
//            if (subscribers === "") {
//                subscribers = subscriberCount;
//            }
//            console.log(subscriberCount + " is now")
//            console.log(subscribers + " was before")
//            if (subscribers !== subscriberCount) {
//                console.log("more subs" + subscriberCount);
//                triggerReaction(reactionId, token, req.body.config)
//                //getIdsFromActionAndData("Youtube subscribers changed", subscriberCount)
//            }
//            subscribers = subscriberCount;
//        }).catch(error => {
//            console.log()
//        })
//    });
//}

exports.checkIfReddit = async (req, res, token, reactionId) => {
    if (req.body.device == 'flutter') {
        req.body.config = JSON.parse(req.body.config)
    }
    let subscribers = "";

    cron.schedule('*/5 * * * * *', () => {
        var config = {
            method: 'get',
            url: 'https://oauth.reddit.com/' + req.body.config.subreddit + '/about',
            headers: {
            'Authorization': 'Bearer ' + token,
            'Cookie': process.env.REDDIT_COOKIE
            }
        };
        axios(config)
        .then(function (response) {
            subscriberCount = response.data["data"]["subscribers"];
            if (subscribers === "") {
                subscribers = subscriberCount
            }
            console.log(subscriberCount + " is now")
            console.log(subscribers + " was before")
            if (subscribers !== subscriberCount) {
                console.log("more subs" + subscriberCount);
                triggerReaction(reactionId, reactionToken, req.body.config)
                //getIdsFromActionAndData("Youtube subscribers changed", subscriberCount)
            }
            subscribers = subscriberCount;
        })
        .catch(function (error) {
            console.log(error);
        });
        res.status(200).send({ message: 'Area successfully created' })
    });
}

//exports.checkIfIntra = async (req, res, token, reactionId) => {
//    if (req.body.device == 'flutter') {
//        req.body.config = JSON.parse(req.body.config)
//    }
//    res.status(200).send({ message: 'Area successfully created' })
//    //cron.schedule('*/2 * * * *'), () => {
//    //    axios.get()
//    //}
//}