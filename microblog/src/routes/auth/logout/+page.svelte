<script lang="ts">
	import { enhance } from "$app/forms";

	let form: HTMLFormElement;

	$: if (form) form.requestSubmit();
</script>
<h1>Signing out, please wait.</h1>
<p>If you don't get signed out, press the button below:</p>
<form method="post" use:enhance bind:this={form}>
	<button class="btn btn-primary" type="submit">Sign out</button>
</form>