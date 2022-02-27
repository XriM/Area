const { pool } = require('../dbConfig')
const axios = require('axios')
const { TokenExpiredError } = require('jsonwebtoken')

exports.sendWhatsApp = (number, message) => {

}

exports.sendEmailOutlook = async (token, message, to, cc) => {
  result = await axios.post('https://graph.microsoft.com/v1.0/me/sendMail', {
    "message": {
      "subject": message.subject,
      "body": {
        "contentType": "Text",
        "content": message.body,
      },
      "toRecipients": to,
      "ccRecipients": cc,
    }
  }, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'content-type': 'applicarion/json'
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
