// require('dotenv').config()
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import webRoutes from './routes/web';

const  app = express();

app.disable('x-powered-by');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev', {skip: () => app.get('env') !== 'local'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', webRoutes);

export default app;
