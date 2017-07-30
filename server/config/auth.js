'use strict';

const passport = require('passport');

const GitHubStrategy = require('passport-github').Strategy;

/**
 * Setup application Auth
 */

module.exports = app => {

  const githubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
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

  passport.use(githubStrategy);
};
