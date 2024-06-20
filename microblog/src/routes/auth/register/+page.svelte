<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import UsernameIcon from '~icons/material-symbols/person';
	import PasswordIcon from '~icons/material-symbols/key';

	export let form: ActionData;
</script>

<form use:enhance method="post" class="form-control gap-4">
	<h1 class="text-2xl font-bold text-center">Sign up</h1>
	<label class="input input-bordered flex items-center gap-2">
		<span><UsernameIcon /></span>
		<input
			class="w-full"
			type="text"
			placeholder="Username"
			autocomplete="username"
			name="username"
			required
		/>
	</label>
	<label class="input input-bordered flex items-center gap-2">
		<span><PasswordIcon /></span>
		<input
			class="w-full"
			type="password"
			placeholder="Password"
			autocomplete="new-password"
			name="password"
			required
		/>
	</label>
	<label class="input input-bordered flex items-center gap-2">
		<span><PasswordIcon /></span>
		<input
			class="w-full"
			type="password"
			placeholder="Confirm Password"
			autocomplete="new-password"
			name="confirmPassword"
			required
		/>
	</label>
	{#if form?.error}
		<p class="text-error">{form?.error}</p>
	{/if}
	<button class="btn btn-primary" type="submit">Sign up</button>
	<p class="text-center">
		Already have an account?
		<a href="/auth/login" class="link">Sign in</a>
	</p>
</form>
