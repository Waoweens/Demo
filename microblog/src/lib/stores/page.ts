import { writable } from "svelte/store";

export const pageTitle = writable<string>('')
export const previousPage = writable<string>('/');