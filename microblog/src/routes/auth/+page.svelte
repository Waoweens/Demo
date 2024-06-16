<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';
	import UsernameIcon from '~icons/material-symbols/person';
	import PasswordIcon from '~icons/material-symbols/key';

	export let form: ActionData;

	$: console.log(form);

	let action: 'login' | 'register' = 'login';

	function switchAction() {
		action = action === 'login' ? 'register' : 'login';
	}
</script>

<form use:enhance action="/auth?/{action}" method="post" class="form-control gap-4">
	<h1 class="text-2xl font-bold text-center">{action === 'login' ? 'Login' : 'Register'}</h1>
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
			autocomplete={action === 'login' ? 'current-password' : 'new-password'}
			name="password"
			required
		/>
	</label>
	{#if action === 'register'}
		<label class="input input-bordered flex items-center gap-2">
			<span><PasswordIcon /></span>
			<input
				class="w-full"
				type="password"
				placeholder="Confirm Password"
				name="confirmPassword"
				required
			/>
		</label>
	{/if}
	{#if form?.error}
		<p class="text-error">{form?.error}</p>
	{/if}
	<button class="btn btn-primary" type="submit">
		{action === 'login' ? 'Login' : 'Register'}
	</button>
	<p class="text-center">
		{action === 'login' ? "Don't have an account?" : 'Already have an account?'}
		<button type="button" on:click={switchAction} class="link">
			{action === 'login' ? 'Register' : 'Login'}
		</button>
	</p>
</form>
