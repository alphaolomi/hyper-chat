import { formatMessage } from '../helpers/messages';
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from '../helpers/users';

export const onMessage = (io) => {
  const botName = 'Hyper Bot';
  let u = 0;

  // Run when client connects
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }:{username:string,room:string}) => {
      const user = userJoin(socket.id, username, room);
      console.log(`joined ${username} on  ${room} ${u++}`);

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
    socket.on('chatMessage', (msg:string) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};
