<script lang="ts">
	import { enhance } from "$app/forms";

	let action: 'login' | 'register' = 'login';

	function switchAction() {
		action = action === 'login' ? 'register' : 'login';
	}
</script>

<form use:enhance action="?/{action}" method="post" class="form-control gap-4 text-center">
	<h1 class="text-2xl font-bold">{action === 'login' ? 'Login' : 'Register'}</h1>
	<label class="input input-bordered flex items-center gap-2">
		<span>Email</span>
		<input type="email" name="email" required />
	</label>
	<label class="input input-bordered flex items-center gap-2">
		<span>Password</span>
		<input type="password" name="password" required />
	</label>
	{#if action === 'register'}
		<label class="input input-bordered flex items-center gap-2">
			<span>Confirm Password</span>
			<input type="password" name="confirmPassword" required />
		</label>
	{/if}
	<button class="btn btn-primary" type="submit">
		{action === 'login' ? 'Login' : 'Register'}
	</button>
	<p>
		{action === 'login' ? "Don't have an account?" : 'Already have an account?'}
		<button type="button" on:click={switchAction} class="link">
			{action === 'login' ? 'Register' : 'Login'}
		</button>
	</p>
</form>
