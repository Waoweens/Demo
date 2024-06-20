<script lang="ts">
	import Composer from '$components/Composer.svelte';
	import RelativeTime from '$components/RelativeTime.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import Timeline from '$components/Timeline.svelte';
	import { getContext } from 'svelte';
	import type { PageData, LayoutData } from './$types';
	import type { PassedUser } from '$lib/common/util';
	import { pageMeta } from '$lib/stores/page';

	$pageMeta = { pageTitle: 'Home' };

	export let data: PageData;

	const user = getContext<PassedUser>('user');
</script>

<div class="flex flex-col">
	<div role="tablist" class="sticky top-0 bg-base-100 z-50 tabs tabs-lg tabs-bordered [--tab-border:0.2rem]">
		<button type="button" role="tab" class="tab tab-active tab-custom-color">Chronological</button>
		<button type="button" role="tab" class="tab">Following</button>
	</div>
	<div class="border-b border-neutral">
		{#if $user?.id}
			<Composer method="post" />
		{:else}
			<div class="m-4 flex justify-between items-center">
				<p class="text-2xl">Sign in to post</p>
				<a href="/auth" class="btn btn-sm btn-primary">Sign in</a>
			</div>
		{/if}
	</div>
	<Timeline posts={data.posts} />
</div>
