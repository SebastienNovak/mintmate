const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config');
const logger = require('./logger'); // Adjust path as necessary.

const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];

let sequelize;

if (environment === 'production' && config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate()
    .then(() => {
        logger.info('Database connection has been established successfully.');
    })
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
    });

// Graceful shutdown
process.on('SIGTERM', () => {
    sequelize.close();
    logger.info('Database connection closed due to app termination.');
    process.exit(0);
});

module.exports = sequelize;
