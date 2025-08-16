import { get } from 'svelte/store';
import { authToken, clearSession } from '$lib/stores/auth';

const API_BASE = 'http://localhost:5000/api'; // change if your backend base differs

export async function fetchWithAuth<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = get(authToken);

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  // If token expired / invalid — clear session and redirect to login
  if (res.status === 401 || res.status === 403) {
    clearSession();
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  // handle no-content
  if (res.status === 204) return null as unknown as T;

  const data: unknown = await res.json();
  if (!res.ok) throw new Error((data as { error?: string })?.error || 'Request failed');

  return data as T;
}
