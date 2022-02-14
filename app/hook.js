const { pool } = require('../dbConfig')

exports.hookHandler = async(req, res) => {
    console.log(req.body);
}