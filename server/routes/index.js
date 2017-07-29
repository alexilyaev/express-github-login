/**
 * App Routes
 */

'use strict';

const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');

/**
 * Site routes
 */

router.get('/', (req, res) => {
  res.render('home', { user: req.user && req.user._json });
});

router.use('/auth', authRoutes);

module.exports = router;
