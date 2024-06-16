<script lang="ts">
	import { enhance } from "$app/forms";

	export let style: string = '';
</script>

<form use:enhance action="/auth?/logout" method="post">
	<button class={'flex items-center gap-2 ' +style} type="submit">
		<slot />
	</button>
</form>