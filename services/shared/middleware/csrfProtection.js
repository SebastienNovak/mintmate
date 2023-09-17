const csurf = require('csurf');

const csrfMiddleware = (req, res, next) => {
    // Let's assume APP_SECRET_HEADER and APP_SECRET_VALUE are constants for mobile app identification
    const isMobileApp = req.headers[APP_SECRET_HEADER] === APP_SECRET_VALUE && req.headers['user-agent'].includes('YourMobileAppUserAgent');

    if (!isMobileApp) {
        csurf()(req, res, next);
    } else {
        next();
    }
};

module.exports = csrfMiddleware;
