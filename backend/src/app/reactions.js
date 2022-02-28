const { pool } = require('../dbConfig')
const axios = require('axios')
const { TokenExpiredError } = require('jsonwebtoken')
const { default: fetch } = require('node-fetch')

exports.sendGitIssue = async(req, token, title, message, res) => {
  var result = await fetch(`https://api.github.com/repos/${req.body.owner}/${req.body.github}/issues`, { method: 'POST', body: JSON.stringify({
    "title": req.body.title,
    "body": req.body.message
  }), headers: { Authorization: "Token " + token}}).then(() => {
    res.status(200).send({ message: "Issue posted well" })
  }).catch((error) => {
    console.error('Error posting the issue')
    throw error
  })
}

exports.sendEmailOutlook = async (token, config) => {
  let to = []
  config.to.forEach(element => {
    const data = {
      "emailAddress": {
        "address": element
      }
    }
    to.push(data)
  })
  let cc = []
  config.cc.forEach(element => {
    const data = {
      "emailAddress": {
        "address": element
      }
    }
    cc.push(data)
  })
  result = await axios.post('https://graph.microsoft.com/v1.0/me/sendMail', {
    "message": {
      "subject": config.subject,
      "body": {
        "contentType": "Text",
        "content": config.message,
      },
      "toRecipients": to,
      "ccRecipients": cc,
    }
  }, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'content-type': 'application/json'
    }
  })
  console.log(result)
}

exports.getReactions = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const serviceReactions = await pool.query('SELECT reaction_id FROM service_reaction')
  console.log(serviceReactions.rows)
  res.status(200).send({ reactions: serviceReactions.rows })
}

exports.getReaction = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const reaction = await pool.query('SELECT * FROM reactions WHERE reaction_id = $1', [parseInt(req.params.reaction_id)])
  console.log(reaction.rows)
  res.status(200).send({ name: reaction.rows[0].name })
}
