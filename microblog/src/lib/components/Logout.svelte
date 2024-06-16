<script lang="ts">
	export let style: string = '';
</script>

<a href="/auth/logout" class={'lex items-center gap-' + style}>
	<slot />
</a>