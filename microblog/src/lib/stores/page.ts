import { writable } from "svelte/store";

export const pageTitle = writable<string>('')
export const pageHistory = writable<string[]>(['/']);
export const isGoingBack = writable<boolean>(false);