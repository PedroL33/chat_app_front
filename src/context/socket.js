import io from 'socket.io-client';
import { createContext } from 'react';

export const socket = io.connect('http://localhost:3000', {query: {token: localStorage.getItem('token')}});

export const SocketContext = createContext();