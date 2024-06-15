<script lang="ts">
	import Composer from "$lib/components/Composer.svelte";
	import Timeline from "$lib/components/Timeline.svelte";

</script>

<div class="flex h-full justify-center">
	<div class="flex w-full flex-row max-w-6xl">
		<aside class="basis-1/5 border border-red-500">Left sidebar</aside>
		<main class="basis-3/5 border border-red-500 flex flex-col">
			<Composer />
			<Timeline />
		</main>
		<aside class="basis-1/5 border border-red-500">Right sidebar</aside>
	</div>
</div>
