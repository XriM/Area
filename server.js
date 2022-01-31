const { login } = require('./app/login');
const { authenticateToken } = require('./app/token')
const { userServices } = require('./app/services')
const { signup } = require('./app/signup');
const express = require('express');

// Constants
const PORT = 8000
const HOST = '0.0.0.0'
const { pool } = require("./dbConfig")
const bcrypt = require("bcrypt");

// App
const app = express();

app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.use(express.json());

app.get('/users/signup', (req, res) => {
    res.render('signup')
});

app.post('/users/signup', signup);
app.post('/users/login', login);

app.get('/users/:username/services', authenticateToken, userServices);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);