// src/stores/content.js
import { writable } from 'svelte/store'

// Get the value out of storage on load.
const stored = localStorage.groupidS
// or localStorage.getItem('content')

// Set the stored value or a sane default.
export const groupidS = writable(stored || '0')

// Anytime the store changes, update the local storage value.
groupidS.subscribe((value) => localStorage.content = value)
// or localStorage.setItem('content', value)