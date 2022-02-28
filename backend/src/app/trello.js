const axios = require('axios')
const { env } = require('dotenv').config()

const { pool } = require('../dbConfig')

exports.postCardTrello = async (req, res, userId, name) => {
  const config = await pool.query('SELECT config FROM user_area WHERE user_id = $1', [userId])
  const token = await pool.query('SELECT token FROM user_services WHERE user_id = $1 AND service_id = NEED ID SERVICE TRELLO', [userId])

  let idList = config.rows[0].config.trello.isList;
  let key = process.env.TRELLO_KEY;

  const result = await axios
    .get('https://api.trello.com/1/cards?key=' + key + '&idList=' + idList + '&token=' + token + '&name=' + name)
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  console.log(result)
}