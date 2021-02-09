import formatMessage from '../helpers/messages';
import {
  userJoin,
  getCurrentUser,
  // userLeave,
  getRoomUsers,
} from '../helpers/users';

let interval;


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("tick", response);
};

export const onMessage = (io) => {
  const botName = 'Hyper Bot';

  // Run when client connects
  io.on('connection', (socket) => {

    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });

    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to Hyper Chat!'));

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`)
        );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    // socket.on('disconnect', () => {

    //   const user = userLeave(socket.id);

    //   if (user) {
    //     io.to(user.room).emit(
    //       'message',
    //       formatMessage(botName, `${user.username} has left the chat`)
    //     );

    //     // Send users and room info
    //     io.to(user.room).emit('roomUsers', {
    //       room: user.room,
    //       users: getRoomUsers(user.room),
    //     });
    //   }
    // });
  });
};
