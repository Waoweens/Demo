<script lang="ts">
	import InfoIcon from '~icons/material-symbols/info-outline';
	import HomeIcon from '~icons/material-symbols/home';
	import NotificationsIcon from '~icons/material-symbols/notifications';
	import ProfileIcon from '~icons/material-symbols/person';
	import SettingsIcon from '~icons/material-symbols/settings';
	import LoginIcon from '~icons/material-symbols/login';
	import LogoutIcon from '~icons/material-symbols/logout';
	import LogoutButton from './LogoutButton.svelte';
	import { getContext } from 'svelte';
	import { type PassedUser } from '$lib/common/util';
	import { page } from '$app/stores';

	const user = getContext<PassedUser>('user');

	$: console.log($page.url.pathname)
</script>

<div class="h-full flex flex-col justify-between py-4">
	<div class="flex flex-col gap-2">
		{#if !$user?.id}
			<div class="flex">
				<div class="shrink-0 w-2"></div>
				<div class="alert alert-info shadow-lg">
					<InfoIcon class="text-xl" />
					<span>Not signed in</span>
				</div>
				<div class="shrink-0 w-2"></div>
			</div>
		{/if}
		<ul class="menu gap-4">
			<li>
				<a href="/" class={$page.url.pathname === '/' ? 'active ' : ''}>
					<HomeIcon class="text-xl" />
					<span>Home</span>
				</a>
			</li>
			<li class={!$user?.id ? 'disabled' : ''}>
				<a href="/notifications" class={$page.url.pathname === '/notifications' ? 'active' : ''}>
					<NotificationsIcon class="text-xl" />
					<span>Notifications</span>
				</a>
			</li>
			<li class={!$user?.id ? 'disabled ' : ''}>
				<a href="/{$user?.username}" class={$page.url.pathname === `/${$user?.username}` ? 'active ' : ''}>
					<ProfileIcon class="text-xl" />
					<span>Profile</span>
				</a>
			</li>
		</ul>
	</div>
	<ul class="menu gap-4">
		<li class={!$user?.id ? 'disabled ' : ''}>
			<a href="/settings" class={$page.url.pathname === `/settings` ? 'active ' : ''}>
				<SettingsIcon class="text-xl" />
				<span>Settings</span>
			</a>
		</li>
		{#if $user?.id}
			<li>
				<LogoutButton>
					<LogoutIcon class="text-xl" />
					<span>Logout</span>
				</LogoutButton>
			</li>
		{:else}
			<li>
				<a href="/auth">
					<LoginIcon class="text-xl" />
					<span>Sign in</span>
				</a>
			</li>
		{/if}
	</ul>
</div>
