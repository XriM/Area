const { user } = require('pg/lib/defaults')
const { pool } = require('../dbConfig')
const axios = require('axios')
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
  const result = await pool.query('SELECT area_name FROM areas WHERE id = $1', [areaId])
  res.status(200).send(result.rows)
}

async function getUserGmailId(userId) {
  serviceToken = await pool.query(`SELECT token FROM user_service WHERE user_id = $1`, [userId]);
  const res = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': serviceToken
    },
  });
  return res.data.emailAddress
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
  const result = await pool.query('INSERT INTO areas (action_id, reaction_id, area_name) VALUES ($1, $2, $3) RETURNING *', [actionId, reactionId, areaName])
  await pool.query('INSERT INTO user_area (area_id, user_id) VALUES ($1, $2)', [result.rows[0].id, userId.rows[0].id])
  const action = pool.query(`SELECT * FROM actions WHERE id = $1`, [actionId]);
  if (action.name == 'Received email') {
    const gmailUserId = await getUserGmailId(userId);
    axios.post(`https://www.googleapis.com/gmail/v1/users/${gmailUserId}/watch`);
  }
  console.log(result.rows)
  res.status(200).send({ message: 'Area successfully created' })
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
