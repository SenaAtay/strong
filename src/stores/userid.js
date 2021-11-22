import { browser } from "$app/env";
import { writable } from "svelte/store";

export const userID = writable(browser && localStorage.userID || null);
userID.subscribe((val) => browser && (localStorage.userID = val));