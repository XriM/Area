const { pool } = require('../dbConfig');

exports.usersGet = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.user);
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`SELECT * FROM users`);
    console.log(result.rows);
    res.status(200).send(result.rows);
}

exports.userGet = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.user);
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`SELECT id FROM users WHERE username = $1`, [req.user.username]);
    console.log(result.rows);
    res.status(200).send(result.rows);
}

exports.userLogout = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.user);
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }


}

exports.userPatch = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.user);
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }

}

exports.userDelete = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.user);
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }

}