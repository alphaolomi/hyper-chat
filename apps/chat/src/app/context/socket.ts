

import React from 'react'
import { io,Socket } from 'socket.io-client'

const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3333";

export const socket = io(SOCKET_URL, {})

export const SocketContext = React.createContext<Socket|null>(null);
