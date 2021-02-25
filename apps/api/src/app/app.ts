import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import webRoutes from './routes/web';

const  app = express();

app.disable('x-powered-by');


app.use(logger('dev', {skip: () => app.get('env') !== 'local'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', webRoutes);

export default app;
