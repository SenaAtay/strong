import { browser } from "$app/env";
import { writable } from "svelte/store";

export const groupNameStore = writable(browser && localStorage.groupNameStore || '...');
groupNameStore.subscribe((val) => browser && (localStorage.groupNameStore = val));