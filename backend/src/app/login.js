const bcrypt = require('bcrypt')
const token = require('./token')
const { pool } = require('../dbConfig')
const Cookies = require('cookies')

exports.login = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  let email = ''
  let password = ''
  if ('email' in req.body && 'password' in req.body) {
    email = req.body.email
    password = req.body.password
  } else {
    return res.status(400).send('Failed to login!')
  }
  let username = ''
  let hash = ''
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  if (!user.rows[0]) {
    return res.status(400).send({ message: "Email doesn't exists!" })
  }
  username = user.rows[0].username
  hash = user.rows[0].password
  let newToken = ''
  console.log(username)
  if (!await bcrypt.compare(password, hash)) {
    return res.status(400).send({ message: 'Wrong password!' })
  } else {
    newToken = token.generateAccessToken(username)
    new Cookies(req, res).set('access_token', newToken, {
      httpOnly: true
    })
    return res.status(200).send({ token: newToken, message: 'Successfully logged in!', user: username })
  }
}
