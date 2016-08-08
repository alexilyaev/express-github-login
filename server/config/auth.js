'use strict';

const passport = require('passport');

const GitHubStrategy = require('passport-github').Strategy;

/**
 * Setup application Auth
 */

module.exports = (app) => {

  const githubStrategy = new GitHubStrategy({
    clientID: 'e855d2361ca8da4c0ab1',
    clientSecret: '999fa34156194f13bbf6405be7cf0a07bc436f0d',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  });

  // Initialize Passport and restore authentication state, if any, from the session.
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  passport.use(githubStrategy, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  });

};
