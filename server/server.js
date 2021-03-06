'use strict';

/**
 * Load modules
 */

require('dotenv-safe').load();

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const winston = require('winston');

const app = express();

/**
 * App settings
 */

app.set('port', process.env.PORT || 3000);
app.set('public', path.resolve(__dirname, '../public'));

// Configure view engine to render EJS templates.
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Define Middleware
 */

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'Im an octopus',
    resave: true,
    saveUninitialized: true
  })
);

// Setup Auth strategies
require('./config/auth')(app);

/**
 * Define Routes
 */

const routes = require('./routes');

app.use('/', routes);

// Serve static files
app.use(express.static(app.get('public')));

/**
 * Start the server
 */

app.listen(app.get('port'), () => {
  winston.info(`Listening on: http://localhost:${app.get('port')}`);
});
