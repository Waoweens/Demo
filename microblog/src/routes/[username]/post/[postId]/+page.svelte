<script lang="ts">
	import BackButton from "$components/BackButton.svelte";
	import PostActions from "$components/PostActions.svelte";
	import PostHeader from "$components/PostHeader.svelte";
	import { pageMeta } from "$lib/stores/page";
	import type { PageData } from "./$types";

	export let data: PageData;
	
	$pageMeta = {
		pageTitle: `${data.post.author.displayName}: "${data.post.content}"`,
		ogTitle: `${data.post.author.displayName} (@${data.post.author.username})`,
		description: data.post.content,
		twImage: data.post.author.profileImage,
		date: data.post.createdAt.toString()
	};

</script>

<div>
	<BackButton title="Post" />
	<article class="flex flex-col gap-2 p-4 border-b border-neutral">
		<PostHeader post={data.post} />
		<p>{data.post.content}</p>
		<PostActions post={data.post} />
	</article>
</div>