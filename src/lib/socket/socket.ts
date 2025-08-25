import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// Create socket instance 
export const socket = io(SOCKET_URL, {
  autoConnect: false, // connect only after login
});

// Join room after login
export const joinUserRoom = (userId: number) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("join", userId.toString());
};
