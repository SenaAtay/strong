import { writable } from 'svelte/store';

export const userID = writable(localStorage.getItem("userID") || null);
userID.subscribe((val) => localStorage.setItem("userID", val));