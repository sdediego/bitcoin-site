const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const verificationRoutes = require('./verification.routes');
const categoryRoutes = require('./category.routes');
const threadRoutes = require('./thread.routes');
const replyRoutes = require('./reply.routes');
const voteRoutes = require('./vote.routes');
const subscriptionRoutes = require('./subscription.routes');
const router  = express.Router();

console.log('EN BUSCA DE LA RUTA');
router.use('/auth', authRoutes);
router.use('/verification', verificationRoutes);
router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/thread', threadRoutes);
router.use('/reply', replyRoutes);
router.use('/vote', voteRoutes);
router.use('/subscription', subscriptionRoutes);

module.exports = router;
