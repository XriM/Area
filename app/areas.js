const { user } = require('pg/lib/defaults');
const { pool } = require('../dbConfig');

exports.getAreas = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    user_id = user_id.rows[0].id;
    result = await pool.query(`SELECT * FROM user_area WHERE user_id = $1`, [user_id]);
    res.status(200).send(result.rows);
}

exports.getArea = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    user_id = user_id.rows[0].id;
    area_id = await pool.query(`SELECT area_id FROM user_area WHERE user_id = $1 AND area_id = $2`, [user_id, parseInt(req.params.area_id)]);
    if (area_id.rows[0] == null) {
        return res.status(400).send({ message: 'Failed to retreive area' });
    }
    area_id = area_id.rows[0].area_id;
    result = await pool.query(`SELECT area_name FROM areas WHERE id = $1`, [area_id]);
    res.status(200).send(result.rows);
}

exports.postArea = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    action_id = parseInt(req.body.action_id);
    reaction_id = parseInt(req.body.reaction_id);
    area_name = req.body.name;
    result = await pool.query(`INSERT INTO areas (action_id, reaction_id, area_name) VALUES ($1, $2, $3) RETURNING *`, [action_id, reaction_id, area_name]);
    await pool.query(`INSERT INTO user_area (area_id, user_id) VALUES ($1, $2)`, [result.rows[0].id, user_id.rows[0].id]);
    console.log(result.rows);
    res.status(200).send({ message: 'Area successfully created'});
}

exports.patchArea = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    area_id = parseInt(req.params.area_id);
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    let result;
    if (req.body.hasOwnProperty('action_id')) {
        action_id = parseInt(req.body.action_id);
        result = await pool.query(`UPDATE areas SET action_id = $1 WHERE id = $2`, [action_id, area_id]);
    }
    if (req.body.hasOwnProperty('reaction_id')) {
        reaction_id = parseInt(req.body.reaction_id);
        result = await pool.query(`UPDATE areas SET reaction_id = $1 WHERE id = $2`, [reaction_id, area_id]);
    }
    console.log(result.rows);
    res.status(200).send({ message: 'Area successfully modified'});
}

exports.deleteArea = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    area_id = parseInt(req.params.area_id);
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    user_id = user_id.rows[0].id;
    await pool.query(`DELETE FROM user_area WHERE user_id = $1 AND area_id = $2`, [user_id, area_id]);
    await pool.query(`DELETE FROM areas WHERE id = $1`, [area_id]);
    res.status(200).send({ message: 'Area successfully deleted'} );
}