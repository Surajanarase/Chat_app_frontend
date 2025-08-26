import type { User, Message } from "$lib/stores/chat";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchUsers(token: string): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchMessages(
  token: string,
  receiverId: string   // 
): Promise<Message[]> {
  const res = await fetch(
    `${API_BASE_URL}/chat/messages?receiverId=${receiverId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
