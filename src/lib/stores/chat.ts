import { writable } from "svelte/store";

// Define User type (matches backend Prisma model)
export interface User {
  id: number;
  username: string;
  email?: string;
}

// Define Message type (matches backend Message model)
export interface Message {
  id?: number;
  senderId: number;
  receiverId: number;
  text: string;
  sender?: { id: number; username: string; email?: string };
  receiver?: { id: number; username: string; email?: string };
}

// Stores
export const users = writable<User[]>([]);
export const messages = writable<Record<number, Message[]>>({});
export const activeReceiverId = writable<number | null>(null);

// Add message utility
export function addMessage(receiverId: number, msg: Message) {
  messages.update((m) => {
    if (!m[receiverId]) {
      m[receiverId] = [];
    }
    m[receiverId] = [...m[receiverId], msg];
    return m;
  });
}
