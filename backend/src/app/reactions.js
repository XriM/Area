const { pool } = require('../dbConfig')
const axios = require('axios')
const { TokenExpiredError } = require('jsonwebtoken')
const { default: fetch } = require('node-fetch')
const {MessageEmbed, WebhookClient} = require('discord.js')


exports.sendDiscordMessage = async(token, config) => {
  const webhookClient = new WebhookClient({ id: config.discord, token: config.url_token });
  const embed = new MessageEmbed()
	.setTitle('Area-Notification')
	.setColor('#0099ff')
  console.log("SALUT JE SUIS DANS DISCORD" + config)
  try {
    webhookClient.send({
      content: 'Reaction triggered',
      username: 'Area-Bot',
      avatarURL: 'https://i.imgur.com/Vxwd6sN.png',
      embeds: [embed],
    });
  } catch (err) {
    throw err
  }
}

exports.sendGitIssue = async(token, config) => {
  var result = fetch(`https://api.github.com/repos/${config.owner}/${config.github}/issues`, { method: 'POST', body: JSON.stringify({
    "title": config.title,
    "body": config.message
  }), headers: { Authorization: "Token " + token}}).then(() => {
    return
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

exports.postCardTrello = async (token, config) => {
  let idList = config.rows[0].config.trello.idList;
  let key = process.env.TRELLO_KEY;

  const result = await axios
    .get('https://api.trello.com/1/cards?key=' + key + '&idList=' + idList + '&token=' + token + '&name=' + config.name)
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
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
