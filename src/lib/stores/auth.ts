import { writable } from 'svelte/store';

export const authUser = writable(null); // null means not logged in
