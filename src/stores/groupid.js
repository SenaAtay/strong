import { browser } from "$app/env";
import { writable } from "svelte/store";

export const groupidS = writable(browser && localStorage.groupidS || '0');
groupidS.subscribe((val) => browser && (localStorage.groupidS = val));