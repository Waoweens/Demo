<script lang="ts">
	import Composer from '$components/Composer.svelte';
	import RelativeTime from '$components/RelativeTime.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import Timeline from '$components/Timeline.svelte';
	import type { PageData, LayoutData } from './$types';

	export let data: PageData & LayoutData;
	$: authStatus = data.signedIn;
</script>

<div class="flex flex-col">
	<div role="tablist" class="tabs tabs-lg tabs-bordered [--tab-border:0.2rem]">
		<button type="button" role="tab" class="tab tab-active tab-custom-color">Chronological</button>
		<button type="button" role="tab" class="tab">Following</button>
	</div>
	<div class="border-b border-neutral">
		{#if authStatus}
			<Composer />
		{:else}
			<div class="m-4 flex justify-between items-center">
				<p class="text-2xl">Sign in to post</p>
				<a href="/auth" class="btn btn-sm btn-primary">Sign in</a>
			</div>
		{/if}
	</div>
	<Timeline {authStatus} posts={data.posts} />
</div>
