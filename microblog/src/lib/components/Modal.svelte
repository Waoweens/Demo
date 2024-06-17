<script lang="ts">
	import { modalActions } from "$lib/stores/modal";
	import type { ModalActions } from "$lib/common/util";

	export let id: string;
	export let dialogStyle: string = '';
	export let modalStyle: string = '';

	export let modal: HTMLDialogElement;
	const dialogActions: ModalActions = {
		id: id,
		open: () => modal.showModal(),
		close: () => modal.close()
	}

	$: if (modal) $modalActions = [...$modalActions, dialogActions];
</script>

<dialog bind:this={modal} {id} class={'modal ' + dialogStyle}>
	<div class={'modal-box ' + modalStyle}>
		<slot />
	</div>
</dialog>