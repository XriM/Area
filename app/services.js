const { pool } = require('../dbConfig');

exports.userServices = async(req, res) => {
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
    services = await pool.query(`SELECT * FROM user_service WHERE user_id = $1 AND service_id = $2`, [result.rows[0].user_id, req.params.serviceId]);
    //services.rows.forEach(element => {
    //    let service = await pool.query(`SELECT * FROM services WHERE id = $1`, [element.service_id]);
    //    let data = {
    //        
    //    }
    //    console.log(service.rows[0].name);
    //});
    res.status(200).send({ message: "test" });
}