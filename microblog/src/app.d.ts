import 'unplugin-icons/types/svelte'
import type { CropperProps } from 'svelte-cropper';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// svelte-cropper/dist/cropper
declare module "svelte-cropper" {
	export interface CropperProps {
		src: string | ArrayBuffer
	}
}

export {};
