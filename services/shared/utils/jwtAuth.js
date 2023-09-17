const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;  // Attach the user payload to the request object
            next();
        });
    } else {
        res.sendStatus(401);  // Unauthorized
    }
};

module.exports = jwtAuth;
