const bcrypt = require('bcrypt')
const token = require('./token')
const { pool } = require('../dbConfig')

exports.login = async(req, res) => {
    let email = '';
    let password = '';
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
        email = req.body.email;
        password = req.body.password;
    } else {
        return res.status(400).send('Failed to login!');
    }
    let username = '';
    let hash = '';
    user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    username = user.rows[0].username;
    hash = user.rows[0].password;
    id = user.rows[0].id;
    let newToken = '';
    console.log(username);
    if (!username) {
        return res.status(400).send({ message: "Email doesn't exists!" });
    } else if (!await bcrypt.compare(password, hash)) {
        return res.status(400).send({ message: 'Wrong password!' });
    } else {
        newToken = token.generateAccessToken(username);
        return res.status(200).send({ token: newToken, id: id, username: username });
    }
}