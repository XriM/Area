const bcrypt = require('bcrypt')
const token = require('./token')
const { pool } = require('../dbConfig')

exports.usersGet = async (req, res) => {
  const result = await pool.query('SELECT username FROM users')
  res.status(200).send(result.rows)
}

exports.userGet = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [req.user.username])
  res.status(200).send({ username: result.rows[0].username, email: result.rows[0].email })
}

exports.userDelete = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const result = await pool.query('DELETE FROM users WHERE username = $1', [req.user.username])
  res.status(200).send({ message: 'Successfully deleted user' })
}

exports.userPatch = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }

  let email = ''
  let password = ''
  let username = ''

  if ('email' in req.body && 'password' in req.body && 'username' in req.body) {
    email = req.body.email
    password = req.body.password
    username = req.body.username
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query('UPDATE users SET email = $1, password = $2, username = $3 WHERE username = $4', [email, hashedPassword, username, req.user.username])
    res.status(200).send({ message: 'User profile successfully modified!' })
  } else if ('email' in req.body) {
    email = req.body.email
    const result = await pool.query('UPDATE users SET email = $1 WHERE username = $2', [email, req.user.username])
    res.status(200).send({ message: 'User profile successfully modified!' })
  } else if ('password' in req.body) {
    password = req.body.password
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, req.user.username])
    res.status(200).send({ message: 'User profile successfully modified!' })
  } else if ('username' in req.body) {
    username = req.body.username
    const result = await pool.query('UPDATE users SET username = $1 WHERE username = $2', [username, req.user.username])
    res.status(200).send({ message: 'User profile successfully modified!' })
  } else {
    res.status(401).send({ message: 'No fields specified!' })
  }
}
