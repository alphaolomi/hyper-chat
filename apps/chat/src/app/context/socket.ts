import React from 'react';
import { io, Socket } from 'socket.io-client';


const SOCKET_URL = "https://hyper-chat-app.herokuapp.com"

// const SOCKET_URL =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:3333'
//     : process.env.REACT_APP_SOCKET_URL ||
//       'https://hyper-chat-app.herokuapp.com';

export const socket = io(SOCKET_URL, {});

export const SocketContext = React.createContext<Socket | null>(null);
