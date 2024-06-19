import type { ModalActions } from "$lib/common/util";
import { writable } from "svelte/store";

export const modalActions = writable<ModalActions[]>([]);