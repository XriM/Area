const { pool } = require('../dbConfig');

exports.getReactions = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    service_reactions = await pool.query(`SELECT reaction_id FROM service_reaction`);
    console.log(service_reactions.rows);
    res.status(200).send({reactions: service_reactions.rows});
}

exports.getReaction = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    reaction = await pool.query(`SELECT * FROM reactions WHERE reaction_id = $1`, [parseInt(req.params.reaction_id)]);
    console.log(reaction.rows);
    res.status(200).send({name: reactions.rows[0].name});
}