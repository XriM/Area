import bcrypt = require('bcrypt');
import token = require('./token');
import * as pool from '../dbConfig';

async function login(req, res) {
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
    pool.pool.query(`SELECT * FROM user_table WHERE email = $1`, [email], (err, results) => {
        if (err) {
            throw err;
        }
        username = results.rows[0].username;
        hash = results.rows[0].password;
    });
    let newToken = '';
    if (!username) {
        return res.status(400).send({ message: "Email doesn't exists!" });
    } else if (!await bcrypt.compare(password, hash)) {
        return res.status(400).send({ message: 'Wrong password!' });
    } else {
        newToken = token.generateAccessToken(username);
        return res.status(200).send({ token: newToken, message: 'Successfully logged in!' });
    }
}

export = login;