import 'unplugin-icons/types/svelte'

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

		// at this point i don't care yet
		interface PageState {
			[key: string]: unknown;
		}

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
