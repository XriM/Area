'use strict';

//const { login } = require('app/login');
const express = require('express');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';
const { pool } = require("./dbConfig")
const bcrypt = require('bcrypt')

// App
const app = express();
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.get('/users/signup', (req, res) => {
    res.render('signup')
    console.log("ICI:")
    console.log(process.env.DB_NAME)
    console.log("ICI 2:")
    console.log(process.env.HOST)
    console.log("ICI,3:")
    console.log(process.env.PORT)
});

app.post('/users/signup', async (req, res) => {
    let { email, username, password } = req.body;

    console.log({
        email,
        username,
        password
    });

    let errors = [];

    if (!email || !username || !password) {
        errors.push({message: "Please enter all fields"});
    }

    if (password.length < 6) {
        errors.push({message: "Password should be at least 6 characters"});
    }

    if (errors.length > 0) {
        res.render('signup', { errors })
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        // pool.query(
        //     `SELECT * FROM user_table
        //     WHERE email = $1`,
        //     [email],
        //     (err, results) => {
        //         if (err) {
        //             throw err;
        //         }
        //         console.log(results.rows);

        //         if (results.row.length > 0) {
        //             errors.push({message: "Email already exist"})
        //             res.render('signup', { errors })
        //         }
        //     }
        // )
    }
});

//app.post('/users/login', login);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
