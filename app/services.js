const { pool } = require('../dbConfig');

exports.userServices = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.user);
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    services = await pool.query(`SELECT * FROM user_service WHERE user_id = $1`, [result.rows[0].user_id]);
    console.log(services.rows);
    res.status(200).send(services.rows);
}