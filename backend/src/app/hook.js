const { pool } = require('../dbConfig')
const axios = require('axios');
const fetch = require('node-fetch');
const { TokenExpiredError } = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
const { sendEmailOutlook, sendDiscordMessage } = require('./reactions');
const { config } = require('dotenv');
const { env } = require('dotenv').config()
//const { json } = require('stream/consumers');

exports.createOutlookHook = async (req, serviceToken, result, userId, res) => {
  const days = 2;
  const expirationDateTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const expirationDateTimeString = expirationDateTime.toISOString();
  console.log(expirationDateTimeString)
  console.log(serviceToken.rows[0].token);
  try {
    resSub = await axios.post('https://graph.microsoft.com/v1.0/subscriptions', {
      'changeType': 'updated',
      'notificationUrl': `${process.env.NGROK_ADDRESS}/hooks`,
      'resource': "/me/mailfolders('inbox')/messages",
      'expirationDateTime': expirationDateTimeString,
      'clientState': 'area-outlook-state',
    }, {
      headers: {
        'Authorization': 'Bearer ' + serviceToken.rows[0].token,
        'Content-Type': 'application/json',
      }
    })
    console.log(resSub)
    if (req.body.device == 'flutter') {
      req.body.config = JSON.parse(req.body.config)
    }
    let config = req.body.config
    console.log("id: " + resSub.data.id)
    config.subscriptionId = resSub.data.id
    //let config = req.body.config
    //console.log("id: " + resSub.data.id)
    //config.subscriptionId = resSub.data.id

    console.log(config)
    const data = await pool.query('INSERT INTO user_area (area_id, user_id, config) VALUES ($1, $2, $3) RETURNING *', [result.rows[0].id, userId.rows[0].id, config])
    console.log(data.rows)
  } catch (err) {
    console.log(err)
    //console.log(err.response.data.error)
  }
  res.status(200).send({ message: 'Area successfully created' })
}

exports.createOneDriveHook = async (req, serviceToken, result, userId, res) => {
  const days = 2;
  const expirationDateTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const expirationDateTimeString = expirationDateTime.toISOString();
  console.log(expirationDateTimeString)
  console.log(serviceToken.rows[0].token);
  try {
    resSub = await axios.post('https://graph.microsoft.com/v1.0/subscriptions', {
      'changeType': 'updated',
      'notificationUrl': `${process.env.NGROK_ADDRESS}/hooks`,
      'resource': "/me/drive/root",
      'expirationDateTime': expirationDateTimeString,
      'clientState': 'area-onedrive-state'
    }, {
      headers: {
        'Authorization': 'Bearer ' + serviceToken.rows[0].token,
        'Content-Type': 'application/json'
      }
    })
    console.log(resSub)
    let config = req.body.config
    req.body.config.subscriptionId = resSub.data.id
    const data = await pool.query('INSERT INTO user_area (area_id, user_id, config) VALUES ($1, $2, $3) RETURNING *', [result.rows[0].id, userId.rows[0].id, config])
    console.log(data.rows)
  } catch (err) {
    console.log(err.response.data.error)
  }
  res.status(200).send({ message: 'Area successfully created' })
}

exports.getGitHubHook = async (req, res) => {
  //token = req.body.

  // const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.body.username])
  // const accessToken = await pool.query('SELECT token FROM user_service WHERE user_id = $1', [userId])
  let row = []

  axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repo}/hooks`, {   // LIST HOOK OF REPO
  headers: { Authorization: `Token ${accessToken}`   },
  }).then((result) => {
    if (!Object.keys(result.data).length) {
      return res.status(200).send({ message: "No webhooks for " + req.body.repo})
    }
    for(let i = 0; i < result.data.length; i++) {
      row.push(result.data[i].id)
        }
      res.status(200).send({ ids: row })
      }
      ).catch((error) => {
        console.error('Error listing hook from GitHub')
        throw error
      }
    )
}

exports.deleteGitHubHook = async (req, res) => {

  // const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.body.username])
  // const accessToken = await pool.query('SELECT token FROM user_service WHERE user_id = $1', [userId])

  axios.delete(`https://api.github.com/repos/${req.body.owner}/${req.body.repo}/hooks/${req.params.hookId}`, {
  headers: { Authorization: `Token ${accessToken}` },
  }).then((result) => {
        if (result.status == '204') {
          res.status(200).send({ message: "Hook " + req.params.hookId + " deleted on repo " + req.body.repo + "." })
        } else if (result.status == '404') {
          res.status(404).send({ message: "There is no " + req.params.hookId + " on " + req.body.repo + " repo."})
        }
      }).catch((error) => {                      // DELETE HOOK
        console.error('Error deleting hook from GitHub')
        throw error
      })
}

exports.createGitHubHook = async (req, serviceToken, result, userId, res) => {

  token = serviceToken.rows[0].token
  console.log('token: ' + token)

  try {
    var resultat = await axios.post(`https://api.github.com/repos/${req.body.config.owner}/${req.body.config.github}/hooks`, { //method: 'POST', body: JSON.stringify({     // CREATE HOOK
        "name": "web",
        "active": true,
        "events": [
            "star"
        ],
        "config": {
            "url": `${process.env.NGROK_ADDRESS}/hooks`,
            "content_type": "json",
            "insecure_ssl": "0"
        }
    }, {
      headers: { Authorization: "Token " + token
      }
    })
    let config = req.body.config
    //req.body.config.subscriptionId = resultat.data.repository.id
    const conf = await pool.query('INSERT INTO user_area (area_id, user_id, config) VALUES ($1, $2, $3) RETURNING *', [result.rows[0].id, userId.rows[0].id, config])
    console.log(conf.rows[0])
  } catch (err) {
    //console.log(err)
    //console.log(err.response.data.error)
  }
  res.status(200).send({ message: 'Area successfully created' })
}

async function getUserIdFromEmail(data) {
  const json = JSON.parse(data);
  const userService = await pool.query("SELECT * FROM user_service WHERE service_config ->> 'email' = $1", [json.emailAddress]);
  console.log(userService.rows[0])
  return userService.rows[0].user_id
}

exports.hookHandler = async (req, res) => {
  if (req.query.validationToken) {
    res.setHeader('content-type', 'text/plain');
    res.status(200).send(req.query.validationToken);
  }
  const body = req.body
  let triggered = false
  let reaction_id
  let config
  let token
  let reactionToken
  console.log(body)
  if ('message' in  body) {
    console.log('Gmail push notification: ')
    console.log(body)
    console.log(Buffer.from(body.message.data, 'base64').toString('ascii'))
  }
  if ('value' in body) {
    console.log('Outlook action')
    console.log(body)
    if (body.value[0].clientState == 'area-outlook-state') {
      console.log(body.value[0].subscriptionId)
      const query = `SELECT * FROM user_area WHERE config ->> 'subscriptionId' = '${body.value[0].subscriptionId}'`
      const user = await pool.query(query)
      if (!('config' in user.rows[0]))
        return
      config = user.rows[0].config
      const tokenRes = await pool.query(`SELECT token FROM user_service WHERE user_id = $1`, [user.rows[0].user_id])
      token = tokenRes.rows[0].token
      const messageRes = await axios.get(`https://graph.microsoft.com/v1.0/me/messages/${body.value[0].resourceData.id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'content-type': 'application/json'
        }
      })
      const area = await pool.query('SELECT * FROM areas WHERE id = $1', [user.rows[0].user_id])
      reaction_id = area.rows[0].reaction_id
      const reactionService = await pool.query('SELECT * FROM service_reaction WHERE reaction_id = $1', [reaction_id])
      reactionToken = await pool.query('SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2', [user.rows[0].user_id, reactionService.rows[0].service_id])
      console.log(messageRes.data.from.emailAddress.address)
      console.log(config.email)
      if (messageRes.data.from.emailAddress.address == config.email)
        triggered = true
    } else if (body.value[0].clientState == 'area-onedrive-state') {
      console.log(body.value[0].subscriptionId)
      const query = `SELECT * FROM user_area WHERE config ->> 'subscriptionId' = '${body.value[0].subscriptionId}'`
      const user = await pool.query(query)
      if (!('config' in user.rows[0]))
        return
      config = user.rows[0].config
      const tokenRes = await pool.query(`SELECT token FROM user_service WHERE user_id = $1`, [user.rows[0].user_id])
      token = tokenRes.rows[0].token
      const area = await pool.query('SELECT * FROM areas WHERE id = $1', [user.rows[0].user_id])
      reaction_id = area.rows[0].reaction_id
      const reactionService = await pool.query('SELECT * FROM service_reaction WHERE reaction_id = $1', [reaction_id])
      reactionToken = await pool.query('SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2', [user.rows[0].user_id, reactionService.rows[0].service_id])
      triggered = true
    }
  }
  if ('action' in body) {
    console.log(body.repository.name)
    const query = `SELECT * FROM user_area WHERE config ->> 'github' = '${body.repository.name}'`
    const user = await pool.query(query)
    if (!('config' in user.rows[0]))
      return
    config = user.rows[0].config
    const area = await pool.query('SELECT * FROM areas WHERE id = $1', [user.rows[0].user_id])
    reaction_id = area.rows[0].reaction_id
    const reactionService = await pool.query('SELECT * FROM service_reaction WHERE reaction_id = $1', [reaction_id])
    reactionToken = await pool.query('SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2', [user.rows[0].user_id, reactionService.rows[0].service_id])
    triggered = true
  }
  if (!triggered)
    return
  switch (reaction_id) {
    case 1:
      sendEmailOutlook(reactionToken, config)
      break;
    case 4:
      sendDiscordMessage(reactionToken, config)
      break;

  }
}