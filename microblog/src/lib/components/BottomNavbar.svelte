<script lang="ts">
	import HomeIcon from '~icons/material-symbols/home';
	import NotificationsIcon from '~icons/material-symbols/notifications';
	import ProfileIcon from '~icons/material-symbols/person';
	import { getContext } from 'svelte';
	import type { PassedUser } from '$lib/common/util';
	import { page } from '$app/stores';

	const user = getContext<PassedUser>('user');
</script>

{#if $user?.id}
	<div class="btm-nav">
		<a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>
			<HomeIcon class="text-xl" />
		</a>
		<a href="/notifications" class={$page.url.pathname === '/notifications' ? 'active' : ''}>
			<NotificationsIcon class="text-xl" />
		</a>
		<a href="/{$user?.username}" class={$page.url.pathname === `/${$user?.username}` ? 'active ' : ''}>
			{#if $user?.profileImage}
				<img src={$user?.profileImage} alt="user profile" class="rounded-full w-6 h-6" />
			{:else}
			<ProfileIcon class="text-xl" />
			{/if}
		</a>
	</div>
{:else}
	<div class="btm-nav">
		<div class="flex flex-row justify-between px-10 bg-neutral text-neutral-content">
			<span class="text-xl">Not signed in</span>
			<a href="/auth/login" class="btn btn-sm btn-primary">Sign in</a>
		</div>
	</div>
{/if}
