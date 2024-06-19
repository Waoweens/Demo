<script lang="ts">
	import BackButton from "$components/BackButton.svelte";
import { pageTitle } from "$lib/stores/page";

	pageTitle.set('Notifications')
</script>

<BackButton title="Notifications" />