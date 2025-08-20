import { writable, derived } from "svelte/store";

export type AuthUser = { id?: number; username?: string; email?: string } | null;

// Reactive stores used throughout the app
export const authUser = writable<AuthUser>(null);
export const authToken = writable<string | null>(null);

//New derived store to get userId directly
export const userId = derived(authUser, ($authUser) => $authUser?.id ?? null);

// Restore session from localStorage on page load (client-only)
if (typeof window !== "undefined") {
  const t = localStorage.getItem("token");
  const u = localStorage.getItem("user");

  if (t) authToken.set(t);
  if (u) {
    try {
      authUser.set(JSON.parse(u));
    } catch {
      authUser.set(null);
    }
  }
}


 //Save token + user to store and to localStorage (call this after login/register)

export function setSession(token: string, user: AuthUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user ?? {}));
  }
  authToken.set(token);
  authUser.set(user);
}

/**
 * Clear session (call on logout)
 */
export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  authToken.set(null);
  authUser.set(null);
}
