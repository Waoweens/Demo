import { writable } from "svelte/store";

export const pageMeta = writable<{
	pageTitle?: string | null;
	ogTitle?: string | null;
	description?: string | null;
	url?: string | null;
	date?: string | null;
}>({})
export const pageHistory = writable<string[]>(['/']);
export const isGoingBack = writable<boolean>(false);