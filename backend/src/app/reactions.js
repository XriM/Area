const { pool } = require('../dbConfig')

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
