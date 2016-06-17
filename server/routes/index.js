'use strict';

const passport = require('passport');

/**
 * Setup application routes
 */

module.exports = (app) => {

  /**
   * Site routes
   */

  app.get('/', (req, res) => {
    res.render('home', { user: req.user && req.user._json });
  });

  /**
   * Auth
   */

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};
