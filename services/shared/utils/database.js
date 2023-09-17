const { Pool } = require('pg');
const config = require('../config/databaseConfig');

const pool = new Pool(config);

const query = (text, params) => pool.query(text, params);

module.exports = {
    query
};
