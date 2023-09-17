const { Sequelize } = require('sequelize');
const dbConfig = require('./config/dbConfig');

const environment = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = dbConfig[environment];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false, // You can set it to true for development to see SQL queries
});

const models = {
  NFT: require('./models/nft'),
  User: require('./models/user'),
  //... other models
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  ...models,
  connect,
  sequelize
};
