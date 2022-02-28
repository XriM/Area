const { pool } = require('../dbConfig')
const axios = require('axios');
const fetch = require('node-fetch');
const { TokenExpiredError } = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
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
  //console.log('Received hook')
  console.log(body)
  if ('message' in  body) {
    console.log('Gmail push notification: ')
    console.log(body)
    console.log(Buffer.from(body.message.data, 'base64').toString('ascii'))
    //const data = Buffer.from(body.message.data, 'base64')
    //console.log(data);
    //const userId = await getUserIdFromEmail(data);
    //console.log(userId)
    //const areaReaction = getAreaReactionFromUser(userId)
    //postReaction(areaReaction);
  }
  if ('value' in body) {
    console.log(body.value[0].resourceData)
    console.log(body.value[0].subscriptionId)
    const query = `SELECT * FROM user_area WHERE config ->> 'subscriptionId' = '${body.value[0].subscriptionId}'`
    const user = await pool.query(query)
    console.log(user.rows)
    const token = await pool.query(`SELECT token FROM user_service WHERE user_id = $1`, [user.rows[0].user_id])
    console.log(token.rows)
    console.log(body.value[0].resourceData.id)
    const messageRes = await axios.get(`https://graph.microsoft.com/v1.0/me/messages/${body.value[0].resourceData.id}`, {
      headers: {
        'Authorization': 'Bearer ' + token.rows[0].token,
        'content-type': 'application/json'
      }
    })

  }
}