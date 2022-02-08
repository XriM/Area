const { pool } = require('../dbConfig');

exports.getActions = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    service_actions = await pool.query(`SELECT action_id FROM service_action`);
    console.log(service_actions.rows);
    res.status(200).send({reactions: service_actions.rows});
}

exports.getAction = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    action = await pool.query(`SELECT * FROM actions WHERE action_id = $1`, [parseInt(req.params.action_id)]);
    console.log(action.rows);
    res.status(200).send({name: actions.rows[0].name});
}