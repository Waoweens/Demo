<script lang="ts">
	import BackButton from "$components/BackButton.svelte";
	import PostActions from "$components/PostActions.svelte";
import PostHeader from "$components/PostHeader.svelte";
import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div>
	<BackButton title="Post" />
	<article class="flex flex-col gap-2 p-4 border-b border-neutral">
		<PostHeader post={data.post} />
		<p>{data.post.content}</p>
		<PostActions post={data.post} />
	</article>
</div>