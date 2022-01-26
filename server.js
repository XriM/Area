'use strict';

const express = require('express');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App
const app = express();
app.post('/users/signup', (req, res) => {
  
});

app.post('/users/login', (req, res) => {

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
