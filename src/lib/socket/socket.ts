import { io } from "socket.io-client";

// Create socket instance but don't auto-connect
export const socket = io("http://localhost:5000", {
  autoConnect: false, // connect only after login
});

// Join room after login
export const joinUserRoom = (userId: number) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("join", userId.toString());
};
