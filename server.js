const { login } = require('./app/login')
const { authenticateToken } = require('./app/token')
const { getUserServices, getUserService, postUserService } = require('./app/services')
const { signup } = require('./app/signup')
const { usersGet } = require('./app/users')
const { userGet } = require('./app/users')
xconst { userPatch } = require('./app/users')
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
app.get('/users/:username', authenticateToken, userGet);
app.patch('/users/:username', authenticateToken, userPatch);
app.delete('/users/:username', authenticateToken, userDelete);

app.post('/users/signup', signup);
app.post('/users/login', login);

app.get('/users/:username/services', authenticateToken, getUserServices);
app.get('/users/:username/services/:service_id', authenticateToken, getUserService);
app.post('/users/:username/services/:service_id', authenticateToken, postUserService);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);