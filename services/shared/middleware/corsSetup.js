const cors = require('cors');

// Options for CORS
const corsOptions = {
    origin: ['https://yourfrontenddomain.com', 'yourapp://'], // replace with your domain and app URI scheme
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const corsSetup = cors(corsOptions);

module.exports = corsSetup;
