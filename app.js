require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const webRoutes = require('./routes/web');
const app = require('express')();

app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev', {skip: () => app.get('env') !== 'local'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', webRoutes);

module.exports = app;
