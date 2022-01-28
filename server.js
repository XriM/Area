'use strict';

const express = require('express');
const cors = require("cors");
const pool = require("./appConfig");
const bcrypt = require('bcrypt');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


app.get('/users/signup', (req, res) => {
    res.render('signup')
    console.log("ICI:")
    console.log(process.env.DB_NAME)
});
app.post('/users/signup', (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.email;

  console.log({
      email,
      username,
      password
  });

  // let errors = [];

  // if (!email || !username || !password) {
  //     errors.push({message: "Please enter all fields"});
  // }

  // if (password.length < 6) {
  //     errors.push({message: "Password should be at least 6 characters"});
  // }

  // if (errors.length > 0) {
  //     res.render('signup', { errors })
  // } else {
  //     let hashedPassword = await bcrypt.hash(password, 10);
  //     console.log(hashedPassword)

  //     pool.query(
  //         `SELECT * FROM user_table
  //         WHERE email = $1`,
  //         [email],
  //         (err, results) => {
  //             if (err) {
  //                 throw err;
  //             }
  //             console.log(results.rows);

  //             if (results.row.length > 0) {
  //                 errors.push({message: "Email already exist"})
  //                 res.render('signup', { errors })
  //             }
  //         }
  //     )
  // }
});
