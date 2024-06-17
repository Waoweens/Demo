<script lang="ts">
	import InfoIcon from '~icons/material-symbols/info-outline';
	import HomeIcon from '~icons/material-symbols/home';
	import NotificationsIcon from '~icons/material-symbols/notifications';
	import ProfileIcon from '~icons/material-symbols/person';
	import SettingsIcon from '~icons/material-symbols/settings';
	import LoginIcon from '~icons/material-symbols/login';
	import LogoutIcon from '~icons/material-symbols/logout';
	import LogoutButton from './LogoutButton.svelte';

	export let authStatus: boolean = false;
</script>

<div class="h-full flex flex-col justify-between py-4">
	<div class="flex flex-col gap-2">
		{#if !authStatus}
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
				<button type="button" class="active">
					<HomeIcon class="text-xl" />
					<span>Home</span>
				</button>
			</li>
			<li class={!authStatus ? 'disabled' : ''}>
				<button type="button">
					<NotificationsIcon class="text-xl" />
					<span>Notifications</span>
				</button>
			</li>
			<li class={!authStatus ? 'disabled' : ''}>
				<button type="button">
					<ProfileIcon class="text-xl" />
					<span>Profile</span>
				</button>
			</li>
		</ul>
	</div>
	<ul class="menu gap-4">
		<li class={!authStatus ? 'disabled' : ''}>
			<button type="button" disabled={!authStatus}>
				<SettingsIcon class="text-xl" />
				<span>Settings</span>
			</button>
		</li>
		{#if authStatus}
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
