<script lang="ts">
	import { isGoingBack, pageHistory } from '$lib/stores/page';
	import IconWarning from '~icons/material-symbols/warning';
	import IconBack from '~icons/material-symbols/arrow-back';
	import { goto } from '$app/navigation';

	export let title: string = 'Back'

	function navigateBack() {
		$isGoingBack = true;
		const history = $pageHistory;
		const last = history[history.length - 1];
		history.pop();
		goto(last);
	}
</script>

<div class="sticky top-0 bg-base-100 z-50 border-b border-neutral">
	<noscript>
		<div class="p-2 bg-warning text-warning-content flex gap-2 items-center">
			<IconWarning class="text-2xl" />
			<span>
				Back button does not work without JavaScript. Please use browser back instead.
			</span>
		</div>
	</noscript>
	
	<div class="flex items-center">
		<button on:click={navigateBack} class="btn btn-ghost btn-circle">
			<IconBack class="text-xl" />
		</button>
		<span class="text-xl font-bold">{title}</span>
	</div>
</div>