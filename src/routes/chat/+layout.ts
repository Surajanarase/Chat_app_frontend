// src/routes/chat/+layout.ts
import { redirect } from "@sveltejs/kit";
import { authUser, authToken, clearSession } from "$lib/stores/auth";
import { get } from "svelte/store";
import { getCurrentUser } from "$lib/api/authApi";
import { joinUserRoom } from "$lib/socket/socket";
import { messages } from "$lib/stores/chat";   

export async function load() {
  const token = get(authToken);

  if (!token) {
    throw redirect(302, "/login"); // no token  go to login
  }

  try {
    // validate token & fetch fresh user
    const freshUser = await getCurrentUser(token);

    // store current user
    authUser.set(freshUser);

    // clear old chat messages on new login
    messages.set({});

    // join socket room immediately after login
    joinUserRoom(freshUser.id);

    return { user: freshUser };
  } catch {
    // token invalid  clear session & redirect
    clearSession();
    throw redirect(302, "/login");
  }
}
