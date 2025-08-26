import { writable } from "svelte/store";

// User type (UUID string IDs now)
export interface User {
  id: string;
  username: string;
  email: string;
}

// Message type
export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt?: string;
  sender?: { id: string; username: string; email?: string };
  receiver?: { id: string; username: string; email?: string };
}

// Stores
export const users = writable<User[]>([]);
export const messages = writable<Record<string, Message[]>>({});
export const activeReceiverId = writable<string | null>(null);

// Add message utility
export function addMessage(receiverId: string, msg: Message) {
  messages.update((m) => {
    if (!m[receiverId]) {
      m[receiverId] = [];
    }
    m[receiverId] = [...m[receiverId], msg];
    return m;
  });
}
