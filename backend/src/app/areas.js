const { user } = require('pg/lib/defaults')
const { pool } = require('../dbConfig')
const axios = require('axios')
const fetch = require('node-fetch')
const { response } = require('express')

exports.getAreas = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  let userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  userId = userId.rows[0].id
  const result = await pool.query('SELECT * FROM user_area WHERE user_id = $1', [userId])
  res.status(200).send(result.rows)
}

exports.getArea = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  let userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  userId = userId.rows[0].id
  let areaId = await pool.query('SELECT area_id FROM user_area WHERE user_id = $1 AND area_id = $2', [userId, parseInt(req.params.area_id)])
  if (areaId.rows[0] == null) {
    return res.status(400).send({ message: 'Failed to retreive area' })
  }
  areaId = areaId.rows[0].area_id
  const result = await pool.query('SELECT name FROM areas WHERE id = $1', [areaId])
  res.status(200).send(result.rows)
}

exports.postArea = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const actionId = parseInt(req.body.action_id)
  const reactionId = parseInt(req.body.reaction_id)
  const areaName = req.body.name
  const result = await pool.query('INSERT INTO areas (action_id, reaction_id, name) VALUES ($1, $2, $3) RETURNING *', [actionId, reactionId, areaName])
  await pool.query('INSERT INTO user_area (area_id, user_id) VALUES ($1, $2)', [result.rows[0].id, userId.rows[0].id])
  let actionRes = await pool.query(`SELECT * FROM actions WHERE id = $1`, [actionId]);
  actionRes = actionRes.rows[0];
  const serviceToken = await pool.query(`SELECT token FROM user_service WHERE user_id = $1`, [userId.rows[0].id]);
  if (actionRes.name == 'Received email') {
    const days = 2;
    const expirationDateTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const expirationDateTimeString = expirationDateTime.toISOString();
    console.log(expirationDateTimeString)
    console.log(serviceToken.rows[0].token);
    try {
      result = await axios.post('https://graph.microsoft.com/v1.0/subscriptions', {
        'changeType': 'created,updated',
        'notificationUrl': 'https://925d-79-80-212-40.ngrok.io/hooks',
        'resource': "/me/mailfolders('inbox')/messages",
        'expirationDateTime': expirationDateTimeString,
        'clientState': 'area-outlook-state',
      }, {
        headers: {
          'Authorization': 'Bearer ' + serviceToken.rows[0].token,
          'Content-Type': 'application/json',
        }
      })
      console.log(result)
    } catch (err) {
      console.log('Error:')
      console.log(err.response.data.error)
    }
    res.status(200).send({ message: 'Area successfully created' })
  }
}

exports.patchArea = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const areaId = parseInt(req.params.area_id)
  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  let result
  if ('action_id' in req.body) {
    const actionId = parseInt(req.body.action_id)
    result = await pool.query('UPDATE areas SET action_id = $1 WHERE id = $2', [actionId, areaId])
  }
  if ('reaction_id' in req.body) {
    const reactionId = parseInt(req.body.reaction_id)
    result = await pool.query('UPDATE areas SET reaction_id = $1 WHERE id = $2', [reactionId, areaId])
  }
  console.log(result.rows)
  res.status(200).send({ message: 'Area successfully modified' })
}

exports.deleteArea = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const areaId = parseInt(req.params.areaId)
  let userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  userId = userId.rows[0].id
  await pool.query('DELETE FROM user_area WHERE user_id = $1 AND area_id = $2', [userId, areaId])
  await pool.query('DELETE FROM areas WHERE id = $1', [areaId])
  res.status(200).send({ message: 'Area successfully deleted' })
}
