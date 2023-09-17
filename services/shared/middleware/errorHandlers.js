const { SERVER_ERROR, NOT_FOUND } = require('../constants/errors');

const handleNotFound = (req, res, next) => {
    res.status(404).json({ error: NOT_FOUND });
};

const handleErrors = (error, req, res, next) => {
    console.error(error.stack); // Log the error stack for debugging
    res.status(error.status || 500).json({ error: error.message || SERVER_ERROR });
};

module.exports = {
    handleNotFound,
    handleErrors
};
