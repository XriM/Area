const { login } = require('./app/login');
const { authenticateToken } = require('./app/token')
const { userServices } = require('./app/services')
const { signup } = require('./app/signup');
const cors = require("cors");
const express = require('express');
var bodyParser = require('body-parser');

// Constants
const PORT = 8000
const HOST = '0.0.0.0'

// App
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.use(express.json());

app.post('/users/signup', signup);
app.post('/users/signin', login);

app.get('/users/:username/services', authenticateToken, userServices);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);