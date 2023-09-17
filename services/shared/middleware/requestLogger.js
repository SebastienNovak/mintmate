const morgan = require('morgan');

module.exports = morgan(':method :url :response-time ms');
