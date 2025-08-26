import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// Singleton socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

// Join room after login
export const joinUserRoom = (userId: string) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("join", userId); 
};
