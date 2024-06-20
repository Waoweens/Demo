<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import UsernameIcon from '~icons/material-symbols/person';
	import PasswordIcon from '~icons/material-symbols/key';
	import { pageMeta } from '$lib/stores/page';

	export let form: ActionData;

	pageMeta.set({ pageTitle: 'Sign in' })
</script>

<form use:enhance method="post" class="form-control gap-4">
	<h1 class="text-2xl font-bold text-center">Sign in</h1>
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
			autocomplete="current-password"
			name="password"
			required
		/>
	</label>
	{#if form?.error}
		<p class="text-error">{form?.error}</p>
	{/if}
	<button class="btn btn-primary" type="submit">
		Sign in
	</button>
	<p class="text-center">
		Don't have an account?
		<a href="/auth/register" class="link">
			Sign up
		</a>
	</p>
</form>
