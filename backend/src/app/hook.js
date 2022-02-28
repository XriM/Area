const { pool } = require('../dbConfig')
const axios = require('axios');
const fetch = require('node-fetch');
const { TokenExpiredError } = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
const { sendEmailOutlook } = require('./reactions');
const { env } = require('dotenv').config()
//const { json } = require('stream/consumers');

exports.getGitHubHook = async (req, res) => {

  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.body.username])
  const accessToken = await pool.query('SELECT token FROM user_service WHERE user_id = $1', [userId])
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

  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.body.username])
  const accessToken = await pool.query('SELECT token FROM user_service WHERE user_id = $1', [userId])

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

exports.createGitHubHook = async (req, token, res) => {

  var result = await fetch(`https://api.github.com/repos/${req.body.owner}/${req.body.github}/hooks`, { method: 'POST', body: JSON.stringify({     // CREATE HOOK
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
  }), headers: { Authorization: "Token " + token}}).then(() => {
  res.status(200).send({ message: "Hook have been well created for " + req.body.github + "." })})
  .catch((error) => {
    console.error('Error creating hook from GitHub')
    throw error
  })
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
  if ('message' in  body) {
    console.log('Gmail push notification: ')
    console.log(body)
    console.log(Buffer.from(body.message.data, 'base64').toString('ascii'))
  }
  if ('value' in body) {
    console.log(body.value[0].subscriptionId)
    const query = `SELECT * FROM user_area WHERE config ->> 'subscriptionId' = '${body.value[0].subscriptionId}'`
    const user = await pool.query(query)
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
    if (messageRes.data.from.emailAddress.address == config.email)
      triggered = true
  }
  if (!triggered)
    return
  switch (reaction_id) {
    case 1:
      sendEmailOutlook(token, config)
      break;
  }
}