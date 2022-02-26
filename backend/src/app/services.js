const { pool } = require('../dbConfig')
const axios = require('axios')

exports.getUserServices = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const result = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const services = await pool.query('SELECT * FROM user_service WHERE user_id = $1', [result.rows[0].user_id])
  console.log(services.rows)
  res.status(200).send(services.rows)
}

exports.getUserService = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const result = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const service = await pool.query('SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2', [result.rows[0].user_id, req.params.serviceId])

  if (service.rows.length === 0) {
    console.log()
    res.status(400).send({ message: 'No such service!' })
  }
  const serviceData = await pool.query('SELECT * FROM services WHERE id = $1', [req.params.serviceId])
  const reactionsId = await pool.query('SELECT id FROM service_reaction WHERE service_id = $1', [req.params.serviceId])
  const actionsId = await pool.query('SELECT id FROM service_action WHERE service_id = $1', [req.params.serviceId])
  const response = {
    name: serviceData.rows[0].name,
    actions_id: [],
    reactions_id: []
  }
  reactionsId.rows.forEach(element => {
    const data = {
      id: reactionsId.id
    }
    response.reactions_id.push(data)
  })
  actionsId.rows.forEach(element => {
    const data = {
      id: actionsId.id
    }
    response.actions_id.push(data)
  })
  console.log(response)
  res.status(200).send(response)
}

const addUserServiceWithoutToken = 'INSERT INTO user_service (user_id, service_id) VALUES ($1, $2) RETURNING (user_id, service_id)'
const addUserServiceWithToken = 'INSERT INTO user_service (user_id, service_id, token) VALUES ($1, $2, $3) RETURNING (user_id, service_id, token)'

async function addServiceToUser (userId, serviceId, token) {
  let result
  console.log('Token: ' + token)
  if (!token) {
    result = await pool.query(addUserServiceWithoutToken, [userId, serviceId])
  } else {
    console.log('Adding token')
    result = await pool.query(addUserServiceWithToken, [userId, serviceId, token])
  }
  console.log(result.rows)
  return result.rows
}

async function getGmailAddress(userService) {
  try {
    response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      headers: {
        'Authorization': ('Bearer ' + userService.token),
      }
    });
    return response.data.emailAddress
  } catch (err) {
    console.error(err)
  }
}

exports.postUserService = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }
  const userId = await pool.query('SELECT id FROM users WHERE username = $1', [req.user.username])
  const serviceId = await pool.query('SELECT id FROM services WHERE id = $1', [parseInt(req.params.service_id)])
  if (serviceId === []) {
    return res.status(400).send({ message: 'No service with this id' })
  }
  if ('token' in req.body) {
    const result = await addServiceToUser(userId.rows[0].id, serviceId.rows[0].id, req.body.token)
  } else {
    const result = await addServiceToUser(userId.rows[0].id, serviceId.rows[0].id, null)
  }
  const userService = await pool.query(`SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2`, [userId.rows[0].id, serviceId.rows[0].id]);
  const service = await pool.query(`SELECT * FROM services WHERE id = $1`, [serviceId.rows[0].id]);
  if (service.rows[0].name == 'Gmail') {
    await pool.query(`UPDATE user_service SET service_config = $1 WHERE user_id = $2 AND service_id = $3`, [{email: await getGmailAddress(userService.rows[0])}, userId.rows[0].id, serviceId.rows[0].id]);

  }
  if (service.rows[0].name == 'Outlook') {
    //await pool.query(`UPDATE user_service SET service_config = $1 WHERE user_id = $2 AND service_id = $3`, [])
  }
  res.status(200).send({ message: 'Service token successfully loaded' })
}

exports.deleteUserService = async (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.user.username !== req.params.username) {
    return res.status(498).send({ message: 'Invalid token!' })
  }

  const userId = await pool.query('SELECT id FROM users WHERE username = $1')
  const serviceId = await pool.query('SELECT id FROM services WHERE id = $1', [parseInt(req.params.service_id)])
  if (serviceId === []) {
    return res.status(400).send({ message: 'No service with this id' })
  }
  const result = await pool.query('DELETE FROM user_service WHERE user_id = $1 AND service_id = $2', [userId.rows[0].id, serviceId.rows[0].id])
  return res.status(200).send({ message: 'No longer connected to service' })
}
