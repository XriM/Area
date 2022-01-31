const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'root',
  host: 'db',
  database: 'area',
  password: 'dbpass',
  port: 5432,
})

module.exports = {
  pool: pool,
}

