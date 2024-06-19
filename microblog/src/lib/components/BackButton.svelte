<script lang="ts">
	import { previousPage } from '$lib/stores/page';
	import IconWarning from '~icons/material-symbols/warning';
	import IconBack from '~icons/material-symbols/arrow-back';

	export let title: string = 'Back'
</script>

<div class="sticky top-0 bg-base-100 z-50">
	<noscript>
		<div class="p-2 bg-warning text-warning-content flex gap-2 items-center">
			<IconWarning class="text-2xl" />
			<span>
				Back button will always return to root without JavaScript. Please use browser back instead.
			</span>
		</div>
	</noscript>
	
	<div class="flex items-center">
		<a href={$previousPage} class="btn btn-ghost btn-circle">
			<IconBack class="text-xl" />
		</a>
		<span class="text-xl font-bold">{title}</span>
	</div>
</div>