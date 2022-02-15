const bcrypt = require('bcrypt')
const { pool } = require('../dbConfig')

exports.signup = async (req, res) => {
  const { email, username, password } = req.body

  const errors = []

  if (!email || !username || !password) {
    errors.push({ message: 'Please enter all fields' })
  }

  if (password.length < 6) {
    errors.push({ message: 'Password should be at least 6 characters' })
  }

  if (errors.length > 0) {
    res.render('signup', { errors })
  } else {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    pool.query(
            `SELECT * FROM users
              WHERE email = $1`, [email],
            (err, results) => {
              if (err) {
                console.log(err)
              }
              console.log(results.rows)
              if (results.rows.length > 0) {
                return res.status(400).render('signup', {
                  message: 'Email address already in use!'
                })
              } else {
                pool.query(
                        `INSERT INTO users (username, email, password)
                      VALUES ($1, $2, $3)
                      RETURNING id, password`, [username, email, hashedPassword],
                        (err, results) => {
                          if (err) {
                            throw err
                          }
                          console.log(results.rows)
                          res.status(200).send({ message: 'Account created!' })
                        }
                )
              }
            }
    )
  }
}
