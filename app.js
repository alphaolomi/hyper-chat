const express = require('express');
const env = require('node-env-file');
const session = require('express-session');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');


const app = express();
app.disable('x-powered-by');

if (app.get('env') === 'test') {
    env(path.join(__dirname, './.env.test'));
} else if (app.get('env') === 'local') {
    env(path.join(__dirname, './../.env'));
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev', {skip: () => app.get('env') !== 'local'}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));


app.use('/api/v1/', apiRoutes);
app.use('/', webRoutes);


app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (error, req, res, next) {
    if (!error.status) error = {
        status: 500,
        message: 'Whoops! Something went wrong.'
    };
    // res.status(error.status).render('error', (0, _objectSpread2["default"])({}, error));

    res.status(error.status).render('error', {error: error});
});

module.exports = app;
