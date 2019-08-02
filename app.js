import path from 'path';
import express from 'express';
import env from 'node-env-file';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import apiRoutes from './routes/api';
import webRoutes from './routes/web';


const app = express();
app.disable('x-powered-by');

if (app.get('env') === 'test') {
    env(path.join(__dirname, './../.env.test'));
} else if (app.get('env') === 'local') {
    env(path.join(__dirname, './../.env'));
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev', { skip: () => app.get('env') !== 'local' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/', apiRoutes);
app.use('/', webRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    if (!error.status) error = { status: 500, message: 'Whoops! Something went wrong.' }
    res.status(error.status).render('error', { ...error });
});

export default app;