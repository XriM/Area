const { login } = require('./app/login')
const { authenticateToken } = require('./app/token')
const { getUserServices, getUserService, postUserService } = require('./app/services')
const { signup } = require('./app/signup')
const { usersGet } = require('./app/users')
const { userGet } = require('./app/users')
const { userPatch } = require('./app/users')
const { userDelete } = require('./app/users')
const { getReactions, getReaction } = require('./app/reactions')
const { getActions, getAction } = require('./app/actions')
const { getAreas, getArea, postArea, patchArea, deleteArea } = require('./app/areas')
const { hookHandler } = require('./app/hook')
const { crontabHandler } = require('./app/crontab')
const { ip } = require('./ip')
const ngrok = require('ngrok')
const express = require('express')
const { env } = require('dotenv').config()

// Constants
const PORT = process.env.PORT
const HOST = process.env.HOST
//const HOST = ip
const { pool } = require('./dbConfig')
const { bcrypt } = require('bcrypt')

// App
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/users', authenticateToken, usersGet)
app.get('/users/:username', authenticateToken, userGet)
app.patch('/users/:username', authenticateToken, userPatch)
app.delete('/users/:username', authenticateToken, userDelete)

app.post('/users/signup', signup)
app.post('/users/login', login)

app.get('/users/:username/services', authenticateToken, getUserServices)
app.get('/users/:username/services/:service_id', authenticateToken, getUserService)
app.post('/users/:username/services/:service_id', authenticateToken, postUserService)

app.get('/users/:username/reactions', authenticateToken, getReactions)
app.get('/users/:username/reactions/:reaction_id', authenticateToken, getReaction)

app.get('/users/:username/actions', authenticateToken, getActions)
app.get('/users/:username/actions/:action_id', authenticateToken, getAction)

app.get('/users/:username/areas', authenticateToken, getAreas)
app.get('/users/:username/areas/:area_id', authenticateToken, getArea)
app.post('/users/:username/areas', authenticateToken, postArea)
app.patch('/users/:username/areas/:area_id', authenticateToken, patchArea)
app.delete('/users/:username/areas/:area_id', authenticateToken, deleteArea)

app.post('/hooks', hookHandler)
//app.post('/crontab', crontabHandler)

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

ngrok.connect({
  proto : 'http',
  addr : PORT,
}, (err, url) => {
  if (err) {
      console.error('Error while connecting Ngrok',err);
      return new Error('Ngrok Failed');
  }
});
