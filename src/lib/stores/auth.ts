import { writable, derived } from "svelte/store";

export type AuthUser = { id?: number; username?: string; email?: string } | null;

// Reactive stores used throughout the app
export const authUser = writable<AuthUser>(null);
export const authToken = writable<string | null>(null);

// Derived store for userId
export const userId = derived(authUser, ($authUser) => $authUser?.id ?? null);

// Restore session from localStorage only token, not user
if (typeof window !== "undefined") {
  const t = localStorage.getItem("token");
  if (t) authToken.set(t);
  //  Don't restore user blindly from localStorage,
  // chat/+layout.ts will fetch and set the real user
}

// Save token + user to store and to localStorage call this after login/register
export function setSession(token: string, user: AuthUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user ?? {}));
  }
  authToken.set(token);
  authUser.set(user);
}

// Clear session (call on logout)
export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  authToken.set(null);
  authUser.set(null);
}
