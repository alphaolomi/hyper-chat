// #!/usr/bin/env node
import app from './app/app';
import { onMessage } from './app/controllers/messages';
// import path from "path";
import debug from 'debug';
debug('www');
// import  http from "http";

const port = process.env.port || 3333;
app.set('port', port);
// const server = http.createServer(app);
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
// const io = require('socket.io')(server);
import { Server } from 'socket.io';
const io = new Server(server);
// const io = socketio(server);
server.on('error', console.error);

onMessage(io);
// server.listen(port);

// require("dotenv").config({ path: path.resolve(process.cwd(), "../.env") });

// const port = normalizePort(process.env.PORT || "3000");

// server.on("error", onError);
// server.on("listening", onListening);
