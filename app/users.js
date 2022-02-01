const bcrypt = require('bcrypt')
const token = require('./token')
const { pool } = require('../dbConfig');

exports.usersGet = async(req, res) => {
    result = await pool.query(`SELECT username FROM users`);
    res.status(200).send(result.rows);
}

exports.userGet = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`SELECT * FROM users WHERE username = $1`, [req.user.username]);
    res.status(200).send({ username: result.rows[0].username, email: result.rows[0].email });
}

exports.userDelete = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }
    result = await pool.query(`DELETE FROM users WHERE username = $1`, [req.user.username]);
    res.status(200).send({ message: "Successfully deleted user" });
}

exports.userPatch = async(req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.user.username != req.params.username) {
        return res.status(498).send({ message: "Invalid token!" });
    }

    let email = '';
    let password = '';
    let username = '';

    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password') && req.body.hasOwnProperty('username')) {
        email = req.body.email;
        password = req.body.password;
        username = req.body.username;
        let hashedPassword = await bcrypt.hash(password, 10);
        result = await pool.query(`UPDATE users SET email = $1, password = $2, username = $3 WHERE username = $4`, [email, hashedPassword, username, req.user.username]);
        res.status(200).send({ message: "User profile successfully modified!" });
    } else if (req.body.hasOwnProperty('email')) {
        email = req.body.email;
        result = await pool.query(`UPDATE users SET email = $1 WHERE username = $2`, [email, req.user.username]);
        res.status(200).send({ message: "User profile successfully modified!" });
    } else if (req.body.hasOwnProperty('password')) {
        password = req.body.password;
        let hashedPassword = await bcrypt.hash(password, 10);
        result = await pool.query(`UPDATE users SET password = $1 WHERE username = $2`, [hashedPassword, req.user.username]);
        res.status(200).send({ message: "User profile successfully modified!" });
    } else if (req.body.hasOwnProperty('username')) {
        username = req.body.username;
        result = await pool.query(`UPDATE users SET username = $1 WHERE username = $2`, [username, req.user.username]);
        res.status(200).send({ message: "User profile successfully modified!" });
    } else {
        res.status(401).send({ message: "No fields specified!" });
    }
}