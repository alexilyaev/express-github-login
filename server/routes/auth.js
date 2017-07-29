/**
 * Auth Routes
 */

'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
