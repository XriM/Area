'use strict';

const express = require('express');
const cors = require("cors");

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App
const app = express();
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
