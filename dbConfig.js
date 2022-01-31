require("dotenv").config()

const { Pool } = require("pg")

const isProduction = process.env.NODE_ENV === "production"

const connectionString = 'postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}'

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
};

const pool = new Pool(credentials);

module.exports = { pool };