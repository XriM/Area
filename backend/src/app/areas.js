const { user } = require('pg/lib/defaults')
const { pool } = require('../dbConfig')
const axios = require('axios')
const { checkIfWeather, checkIfSubscribe, checkIfSteam, checkIfCrypto } = require('./crontab')
const fetch = require('node-fetch')
const { response } = require('express')
const { env } = require('dotenv').config()
const { createGitHubHook, createOutlookHook, createOneDriveHook } = require('./hook')
const { sendGitIssue, sendDiscordMessage } = require('./reactions')

exports.getAreas = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  let response = []
  let userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  userId = userId.rows[0].id
  const result = await pool.query('SELECT * FROM user_area WHERE user_id = $1', [userId])
  for (const element of result.rows) {
    const area = await pool.query('SELECT * FROM areas WHERE id = $1', [element.area_id])
    const action = await pool.query('SELECT * FROM actions WHERE id = $1', [area.rows[0].action_id])
    const reaction = await pool.query('SELECT * FROM reactions WHERE id = $1', [area.rows[0].reaction_id])
    response.push({id: area.rows[0].id, name: area.rows[0].name, action: {id: action.rows[0].id, name: action.rows[0].name }, reaction: {id: reaction.rows[0].id, name: reaction.rows[0].name}})
  }
  return res.status(200).send(response)
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
    return res.status(400).send({ message: 'Failed to retrieve area' })
  }
  areaId = areaId.rows[0].area_id
  const result = await pool.query('SELECT name FROM areas WHERE id = $1', [areaId])
  res.status(200).send(result.rows)
}

exports.postArea = async (req, res) => {
  //req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const actionId = parseInt(req.body.action_id)
  const reactionId = parseInt(req.body.reaction_id)
  const areaName = req.body.name
  const result = await pool.query('INSERT INTO areas (action_id, reaction_id, name) VALUES ($1, $2, $3) RETURNING *', [actionId, reactionId, areaName])
  let actionRes = await pool.query(`SELECT * FROM actions WHERE id = $1`, [actionId]);
  actionRes = actionRes.rows[0];
  let reactionRes = await pool.query(`SELECT * FROM reactions WHERE id = $1`, [reactionId]);
  reactionRes = reactionRes.rows[0];
  const serviceToken = await pool.query(`SELECT token FROM user_service WHERE user_id = $1`, [userId.rows[0].id]);
  switch (actionRes.name) {
    case 'Received email':
      createOutlookHook(req, serviceToken, result, userId, res)
      break;

    case 'Steam players changed':
      await pool.query(`INSERT INTO user_area (user_id, area_id, config) VALUES ($1, $2, $3)`, [userId.rows[0].id, result.rows[0].id, req.body.config])
      checkIfSteam(req, res, '', reactionId)
      break;

    case 'Area successfully created':
      createGitHubHook(req, res, serviceToken.rows[0].token)
      break;

    case 'Weather changed':
      await pool.query(`INSERT INTO user_area (user_id, area_id, config) VALUES ($1, $2, $3)`, [userId.rows[0].id, result.rows[0].id, req.body.config])
      checkIfWeather(req, res, '', reactionId)
      break;

    case 'CryptoCurrency price changed':
      await pool.query(`INSERT INTO user_area (user_id, area_id, config) VALUES ($1, $2, $3)`, [userId.rows[0].id, result.rows[0].id, req.body.config])
      checkIfCrypto(req, res, '', reactionId)
      break;
    
    case 'File added':
      createOneDriveHook(req, serviceToken, result, userId, res)
      break

    case 'Youtube subscribers changed':
      await pool.query(`INSERT INTO user_area (user_id, area_id, config) VALUES ($1, $2, $3)`, [userId.rows[0].id, result.rows[0].id, req.body.config])
      checkIfSubscribe(userId, res, serviceToken.rows[0].token, reactionId)
      break;

    case 'Subreddit subscribers changed':
      await pool.query(`INSERT INTO user_area (user_id, area_id, config) VALUES ($1, $2, $3)`, [userId.rows[0].id, result.rows[0].id, req.body.config])
      checkIfReddit(userId, res, serviceToken.rows[0].token, reactionId)
      break;

    default:
      res.status(404).send({ message: "Error parsing user's Areas"})
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
  const areaId = req.params.areaId
  let userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  userId = userId.rows[0].id
  await pool.query('DELETE FROM user_area WHERE user_id = $1 AND area_id = $2', [userId, areaId])
  await pool.query('DELETE FROM areas WHERE id = $1', [areaId])
  res.status(200).send({ message: 'Area successfully deleted' })
}
