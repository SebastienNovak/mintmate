require('dotenv').config();
console.log('Dotenv initialized');
console.log('Environment variables loaded:', Object.keys(process.env));

console.log('DB_REPLICAS value:', process.env.DB_REPLICAS);
const REPLICAS = (process.env.DB_REPLICAS && JSON.parse(process.env.DB_REPLICAS)) || [];

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        timezone: 'UTC',
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        modelPaths: [__dirname + '/models'],
        migrationStorage: 'sequelize',
        migrationStorageTableName: 'sequelize_meta',
        seederStorage: 'sequelize',
        seederStorageTableName: 'sequelize_seed',
        retry: {
            max: 5
        },
        benchmark: true,
        bindParam: false,
        native: true,
        typeValidation: true  // Enables type validation for the development environment
    },
    test: {
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASS,
        database: process.env.TEST_DB_NAME,
        host: process.env.TEST_DB_HOST,
        dialect: 'postgres',
        logging: false,
        modelPaths: [__dirname + '/models']
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        modelPaths: [__dirname + '/models'],
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: true, // Recommended to keep true unless you're certain about your certificate sources
                ca: process.env.DB_CA_PATH,
                key: process.env.DB_KEY_PATH,
                cert: process.env.DB_CERT_PATH,
            }
        },
        replication: {
            read: REPLICAS,
            write: { host: process.env.DB_WRITE_HOST, username: process.env.DB_WRITE_USER, password: process.env.DB_WRITE_PASS }
        }
    }
};
