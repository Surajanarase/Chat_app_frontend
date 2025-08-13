import { writable } from 'svelte/store';

export interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

export const messages = writable<Message[]>([
  {
    id: 1,
    sender: "Suraj Anarase",
    text: "Hey! How's it going?",
    timestamp: "10:00 AM"
  },
  {
    id: 2,
    sender: "Inflection Zone",
    text: "All good here! Working on our project ",
    timestamp: "10:02 AM"
  }
]);
