const { sequelize } = require('../models');
const logger = require('./logger'); // Adjust path as necessary.

const handleError = (message, error) => {
    logger.error(message, error);
    throw error; // Propagate the error for the caller to handle.
};

const initialize = async () => {
    try {
        await sequelize.sync({ alter: true });
        logger.info('Database synced successfully');
    } catch (error) {
        logger.error('Error initializing database:', error);
    }
};

const closeConnection = async () => {
    try {
        await sequelize.close();
        logger.info('Database connection closed');
    } catch (error) {
        logger.error('Error closing database connection:', error);
    }
};

const executeTransaction = async (callback) => {
    const transaction = await sequelize.transaction();
    try {
        const result = await callback(transaction);
        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const paginateResults = (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return {
        limit,
        offset
    };
};

const bulkInsert = async (model, records) => {
    try {
        await model.bulkCreate(records);
        logger.info('Bulk insert completed successfully');
    } catch (error) {
        logger.error('Error during bulk insert:', error);
    }
};

const findById = async (model, id) => {
    try {
        return await model.findByPk(id);
    } catch (error) {
        logger.error('Error fetching record by ID:', error);
        throw error;
    }
};

const checkDbConnection = async () => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (error) {
        logger.error('Database connection is not healthy:', error);
        return false;
    }
};

const deleteRecord = async (model, conditions) => {
    try {
        return await model.destroy({ where: conditions });
    } catch (error) {
        handleError('Error deleting record:', error);
    }
};

const findWithConditions = async (model, conditions, options = {}) => {
    try {
        return await model.findAll({ where: conditions, ...options });
    } catch (error) {
        handleError('Error fetching records with conditions:', error);
    }
};


process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = {
    initialize,
    closeConnection,
    executeTransaction,
    paginateResults,
    bulkInsert,
    findById,
    checkDbConnection,
    deleteRecord,
    findWithConditions
};
