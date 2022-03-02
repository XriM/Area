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

async function triggerReaction(reactionId)
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

exports.checkIfWeather = async (body, res, token, reactionId) => {

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
                triggerReaction(reactionId, token, body.config)
            }
            res.status(200).send({message: 'Crontabs weather done.'})
            })
        })
}

exports.checkIfCrypto = async (body, res, token, reactionId) => {
    // ici c'est le bitcoigne

    const pair = Buffer.from(body.crypto.data, 'base64')
    const value_min = parseInt(Buffer.from(body.value_min.data, 'base64'))
    const value_max = parseInt(Buffer.from(body.value_max.data, 'base64'))

    let kraken = new ccxt.kraken()

    cron.schedule('*/2 * * * *', () => {
        kraken.fetchOHLCV(pair, '1m').then(data  => {
            res = parseInt(Buffer.from(data[0][1]), 'base64')
            if (value_min > res || value_max < res) {
                triggerReaction(reactionId, token, body.config)
            }
            res.status(200).send({message: 'Crontabs crypto done.'})
            console.log(data)
        })
        //console.log("CRONED Crypto") //debug
    })
}

exports.checkIfSteam = async (req, res, token, reactionId) => {

    cron.schedule('*/2 * * * *', async () => {
        var result = fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/`, { method: 'GET', body: JSON.stringify({
            "appid": req.body.steam
        }).then((data) => {
            if (data.response.player_count < req.body.players_min || data.response.player_count > req.body.players_max) {
                triggerReaction(reactionId, token, body.config)
            }
            res.status(200).send({message: 'Crontabs steam done.'})
        }).catch((error) => {
            res.status(404).send({message: 'Crontabs steam error.'})
            throw error
            })
        })
        //console.log("CRONED steam") //debug
    })
}

exports.checkIfSubscribe = async (body, res, token, reactionId) => {
    //const key = await pool.query('SELECT token FROM user_services WHERE user_id = $1 AND service_id = NEED YOUTUBE SERVICE ID', [userId])
    let subscribers = "";

    cron.schedule('*/2 * * * *', () => {
        

        axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&part=brandingSettings&mine=true", {
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then((result) => {
            subscriberCount = result.data["items"][0]["statistics"]["subscriberCount"];
            if (subscribers === "") {
                subscribers = subscriberCount;
            }
            console.log(subscriberCount + " is now")
            console.log(subscribers + " was before")
            if (subscribers !== subscriberCount) {
                console.log("more subs" + subscriberCount);
                triggerReaction(reactionId, token, body.config)
                //getIdsFromActionAndData("Youtube subscribers changed", subscriberCount)
            }
            subscribers = subscriberCount;
          }).catch(error => {
            console.log('Error to fetch userdata\n' + error);
            res.status(404).send({message: 'Crontabs youtube error.'})
          });
        res.status(200).send({message: 'Crontabs youtube done.'})
    });
}

exports.checkIfReddit = async (body, res, token, reactionId) => {
    let subscribers = "";

    cron.schedule('*/5 * * * * *', () => {
        var config = {
            method: 'get',
            url: 'https://oauth.reddit.com/' + body.config.subreddit + '/about',
            headers: {
            'Authorization': 'Bearer ' + process.env.REDDIT_BEARER,
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
                triggerReaction(reactionId, token, body.config)
                //getIdsFromActionAndData("Youtube subscribers changed", subscriberCount)
            }
            subscribers = subscriberCount;
        })
        .catch(function (error) {
            console.log(error);
        });
        res.status(200).send({message: "Done"})
    });
}