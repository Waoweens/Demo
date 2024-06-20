<script lang="ts">
	import BackButton from '$components/BackButton.svelte';
	import { pageMeta } from '$lib/stores/page';

	$pageMeta = { pageTitle: 'Notifications' };
</script>

<BackButton title="Notifications" />
