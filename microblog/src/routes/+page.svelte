<script lang="ts">
	import Composer from "$lib/components/Composer.svelte";
	import SideNavbar from "$lib/components/SideNavbar.svelte";
	import Timeline from "$lib/components/Timeline.svelte";

</script>

<div class="flex h-full justify-center">
	<div class="flex w-full flex-row max-w-6xl">
		<aside class="hidden md:block basis-1/5">
			<SideNavbar />
		</aside>
		<main class="flex-1 border border-neutral flex flex-col">
			<div role="tablist" class="tabs tabs-lg tabs-bordered [--tab-border:0.2rem]">
				<button type="button" role="tab" class="tab tab-active tab-custom-color">Chronological</button>
				<button type="button" role="tab" class="tab">Following</button>
			</div>
			<div class="border-b border-neutral">
				<Composer />
			</div>
			<Timeline />
		</main>
		<aside class="hidden md:block basis-1/5">Right sidebar</aside>
	</div>
</div>
