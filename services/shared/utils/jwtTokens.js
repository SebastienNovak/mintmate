const jwt = require('jsonwebtoken');

const issueAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '20m' });
};

const issueRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET); // refreshToken usually doesn't expire but can if desired
};

module.exports = {
    issueAccessToken,
    issueRefreshToken
};
