const { pool } = require('../dbConfig');

exports.getUserServices = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    services = await pool.query(`SELECT * FROM user_service WHERE user_id = $1`, [result.rows[0].user_id]);
    console.log(services.rows);
    res.status(200).send(services.rows);
}

exports.getUserService = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    service = await pool.query(`SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2`, [result.rows[0].user_id, req.params.serviceId]);

    if (service.rows.length == 0) {
        console.log();
        res.status(400).send({ message: "No such service!" });
    }
    service_data = await pool.query(`SELECT * FROM services WHERE id = $1`, [req.params.serviceId]);
    reactions_id = await pool.query(`SELECT id FROM service_reaction WHERE service_id = $1`, [req.params.serviceId]);
    actions_id = await pool.query(`SELECT id FROM service_action WHERE service_id = $1`, [req.params.serviceId]);
    let response = {
        name: service_data.rows[0].name,
        actions_id: [],
        reactions_id: [],
    }
    reactions_id.rows.forEach(element => {
        let data = {
            id: reactions_id.id,
        }
        response.reactions_id.push(data);
    });
    actions_id.rows.forEach(element => {
        let data = {
            id: actions_id.id,
        }
        response.actions_id.push(data);
    });
    console.log(response);
    res.status(200).send(response);
}

const add_user_service_without_token = `INSERT INTO user_service (user_id, service_id) VALUES ($1, $2) RETURNING (user_id, service_id)`;
const add_user_service_with_token = `INSERT INTO user_service (user_id, service_id, token) VALUES ($1, $2) RETURNING (user_id, service_id, token)`;

async function addServiceToUser(user_id, service_id, token) {
    let result;
    if (!token) {
        result = await pool.query(add_user_service_without_token, [user_id, service_id]);
    } else {
        result = await pool.query(add_user_service_with_token, [user_id, service_id, token]);
    }
    console.log(result.rows);
    return result.rows;
}

exports.postUserService = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    user_id = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    if (req.body.hasOwnProperty('token')) {
        result = await addServiceToUser(user_id.rows[0].id, req.params.id, null);
    } else {
        result = await addServiceToUser(user_id.rows[0].id, req.params.id, req.body.token);
    }
    res.status(200).send("Service token successfully loaded");
}