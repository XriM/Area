const { login } = require('./app/login')
const { authenticateToken } = require('./app/token')
const { userServices } = require('./app/services')
const { signup } = require('./app/signup')
const { usersGet } = require('./app/users')
const { userGet } = require('./app/users')
const { userLogout } = require('./app/users')
const { userPatch } = require('./app/users')
const { userDelete } = require('./app/users')

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

app.get('/users', authenticateToken, usersGet);
app.get('/users/:id', authenticateToken, userGet);
app.post('/users/:username/logout', userLogout);
app.patch('/users/:username', userPatch);
app.delete('/users/:username', userDelete);

app.post('/users/signup', signup);
app.post('/users/login', login);

app.get('/users/:username/services', authenticateToken, userServices);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);