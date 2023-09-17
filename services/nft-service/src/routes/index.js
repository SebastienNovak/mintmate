const express = require('express');
require('dotenv').config();
const nftRoutes = require('./nfts');
const userRoutes = require('./users');
const authRoutes = require('./auth');
const orderRoutes = require('./orders');
const adminRoutes = require('./admin');
const profileRoutes = require('./profile');
const searchRoutes = require('./search');
const favoritesRoutes = require('./favorites');
const commentsRoutes = require('./comments');
const collectionsRoutes = require('./collections');
const notificationsRoutes = require('./notifications');
const analyticsRoutes = require('./analytics');
const supportRoutes = require('./support');
const activityRoutes = require('./activity');
const settingsRoutes = require('./settings');

const router = express.Router();
const v1Router = express.Router();

const upload = require('./middleware/upload'); // File upload middleware
const basicMiddleware = require('./middleware/basicMiddleware');
const jwtMiddleware = require('./middleware/jwtMiddleware');
const errorHandlers = require('./middleware/errorHandlers');

// =================== Middleware ===================
router.use(basicMiddleware);  // Includes helmet, compression, cors, morgan, requestID, responseTime, bodyParser, rate limiter, session, CSRF, and validation

// =================== JWT Auth for mobile clients ===================
router.use(jwtMiddleware);

// =================== API Routes ===================
v1Router.use('/nfts', nftRoutes);
v1Router.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded!');
});
v1Router.use('/users', userRoutes);
v1Router.use('/auth', authRoutes);
v1Router.use('/orders', orderRoutes);
v1Router.use('/admin', adminRoutes);
v1Router.use('/profile', profileRoutes);
v1Router.use('/search', searchRoutes);
v1Router.use('/favorites', favoritesRoutes);
v1Router.use('/comments', commentsRoutes);
v1Router.use('/collections', collectionsRoutes);
v1Router.use('/notifications', notificationsRoutes);
v1Router.use('/analytics', analyticsRoutes);
v1Router.use('/support', supportRoutes);
v1Router.use('/activity', activityRoutes);
v1Router.use('/settings', settingsRoutes);

router.use('/api/v1', v1Router);

// =================== Utility Routes ===================
router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// =================== Error Handling ===================
router.use(errorHandlers);  // Includes syntax error handling and 404 handling

module.exports = router;
