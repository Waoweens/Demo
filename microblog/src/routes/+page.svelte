<script lang="ts">
	import Composer from '$components/Composer.svelte';
	import RelativeTime from '$components/RelativeTime.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import Timeline from '$components/Timeline.svelte';
	import type { PageData, LayoutData } from './$types';

	export let data: PageData & LayoutData;
	const authStatus = data.signedIn;

	// $: console.log(data);
</script>

<div class="flex h-full justify-center">
	<div class="flex w-full flex-row max-w-6xl">
		<aside class="hidden md:block basis-1/5">
			<SideNavbar authStatus={data.signedIn} />
		</aside>
		<main class="flex-1 border-x border-neutral flex flex-col">
			<div role="tablist" class="tabs tabs-lg tabs-bordered [--tab-border:0.2rem]">
				<button type="button" role="tab" class="tab tab-active tab-custom-color"
					>Chronological</button
				>
				<button type="button" role="tab" class="tab">Following</button>
			</div>
			<div class="border-b border-neutral">
				{#if data.signedIn}
					<Composer />
				{:else}
					<div class="m-4 flex justify-between items-center">
						<p class="text-2xl">Sign in to post</p>
						<a href="/auth" class="btn btn-sm btn-primary">Sign in</a>
					</div>
				{/if}
			</div>
			<Timeline {authStatus} posts={data.posts}  />
		</main>
		<aside class="hidden md:block basis-1/5">Right sidebar</aside>
	</div>
</div>
