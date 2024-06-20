<script lang="ts">
	import { enhance } from "$app/forms";
	import { pageMeta } from "$lib/stores/page";

	let form: HTMLFormElement;

	$: if (form) form.requestSubmit();

	pageMeta.set({ pageTitle: 'Log out' })
</script>
<h1>Logging out, please wait.</h1>
<p>If you don't get logged out, press the button below:</p>
<form method="post" use:enhance bind:this={form}>
	<button class="btn btn-primary" type="submit">Logout</button>
</form>