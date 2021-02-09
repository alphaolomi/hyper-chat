import app from './app/app';
import debug from 'debug';
debug('www');
import { onMessage } from './app/controllers/messages';

const port = process.env.port || 3333;
app.set('port', port);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

import { Server } from 'socket.io';
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

server.on('error', console.error);

onMessage(io);
