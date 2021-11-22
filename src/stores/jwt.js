import { browser } from "$app/env";
import { writable } from "svelte/store";

export const jwt = writable(browser && localStorage.jwt || null);
jwt.subscribe((val) => browser && (localStorage.jwt = val));
