const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.generateAccessToken = (username) => {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).send({ message: 'You need to signin to an account!' })

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(user)
    if (err) {
      return res.status(498).send({ message: 'Invalid token!' })
    }
    req.user = user
    next()
  })
}
