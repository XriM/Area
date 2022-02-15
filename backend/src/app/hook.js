const { pool } = require('../dbConfig')
const axios = require('axios')

function getUserIdFromEmail(data) {
  return 1;
}

exports.hookHandler = async (req, res) => {
  const body = req.body;
  if ('message' in  body) {
    console.log('Gmail push notification: ');
    console.log(body)
    const data = Buffer.from(body.message.data, 'base64')
    console.log(data);
    const userId = getUserIdFromEmail(data);
    const areaReaction = getAreaReactionFromUser(userId)
    postReaction(areaReaction);
  }
}
