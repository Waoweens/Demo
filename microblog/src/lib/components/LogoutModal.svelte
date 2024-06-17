<script lang="ts">
	import Modal from './Modal.svelte';

	let modal: HTMLDialogElement;
</script>

<Modal bind:modal id="logoutModal">
	<h3 class="font-bold text-lg">Log out</h3>
	<p class="py-4">Are you sure you want to log out?</p>
	<div class="modal-action">
		<form method="dialog">
			<button class="btn">Cancel</button>
		</form>
		<a on:click={()=>modal.close()} href="/auth/logout" class="btn btn-error">Log out</a>
	</div>
</Modal>
