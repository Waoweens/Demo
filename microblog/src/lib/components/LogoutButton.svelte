<script lang="ts">
	import { modalActions } from "$lib/stores/modal";
	import { get } from "svelte/store";

	export let style: string = '';

	function open() {
		const actions = get(modalActions);
		const action = actions.find(action => action.id === 'logoutModal');
		if (action) {
			action.open();
		}
	}
</script>

<button on:click={open} class={'flex items-center gap-2 ' + style}>
	<slot />
</button>