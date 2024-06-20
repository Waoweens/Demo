import { writable } from "svelte/store";

export const pageHistory = writable<string[]>(['/']);
export const isGoingBack = writable<boolean>(false);