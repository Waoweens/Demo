<script lang="ts">
	import HomeIcon from '~icons/material-symbols/home';
	import SearchIcon from '~icons/material-symbols/search';
	import ChatIcon from '~icons/material-symbols/chat-bubble';
	import NotificationsIcon from '~icons/material-symbols/notifications';
	import ProfileIcon from '~icons/material-symbols/person';
	import { getContext } from 'svelte';
	import type { PassedUser } from '$lib/common/util';

	const user = getContext<PassedUser>('user');
</script>

{#if $user?.id}
	<div class="btm-nav">
		<button type="button" class="active">
			<HomeIcon class="text-xl" />
		</button>
		<button type="button" disabled>
			<SearchIcon class="text-xl" />
		</button>
		<button type="button" disabled>
			<ChatIcon class="text-xl" />
		</button>
		<button type="button">
			<NotificationsIcon class="text-xl" />
		</button>
		<button type="button">
			<ProfileIcon class="text-xl" />
		</button>
	</div>
{:else}
	<div class="btm-nav">
		<div class="flex flex-row justify-between px-10 bg-neutral text-neutral-content">
			<span class="text-xl">Not signed in</span>
			<a href="/auth/login" class="btn btn-sm btn-primary">Sign in</a>
		</div>
	</div>
{/if}
