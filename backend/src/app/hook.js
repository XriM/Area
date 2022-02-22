const { pool } = require('../dbConfig')
const axios = require('axios');
//const { json } = require('stream/consumers');

async function getUserIdFromEmail(data) {
  const json = JSON.parse(data);
  const userService = await pool.query("SELECT * FROM user_service WHERE service_config ->> 'email' = $1", [json.emailAddress]);
  console.log(userService.rows[0])
  return userService.rows[0].user_id
}

exports.hookHandler = async (req, res) => {
  const body = req.body;
  console.log('Received hook')
  if ('message' in  body) {
    console.log('Gmail push notification: ');
    console.log(body)
    //const data = Buffer.from(body.message.data, 'base64')
    //console.log(data);
    //const userId = await getUserIdFromEmail(data);
    //console.log(userId)
    //const areaReaction = getAreaReactionFromUser(userId)
    //postReaction(areaReaction);
  }
}
