import { writable } from "svelte/store";

export const pageMeta = writable<{
	pageTitle?: string;
	ogTitle?: string;
	description?: string;
	url?: string;
	date?: string;
}>({})
export const pageHistory = writable<string[]>(['/']);
export const isGoingBack = writable<boolean>(false);