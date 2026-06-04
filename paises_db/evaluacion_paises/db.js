const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'paises_db',
    password: 'Lexmark123',
    port: 5432
});

module.exports = pool;