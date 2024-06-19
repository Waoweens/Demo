<script lang="ts">
	import type { Post } from '@prisma/client';
	import { goto } from '$app/navigation';
	import type { TimelinePost } from '$lib/common/util';
	import RelativeTime from './RelativeTime.svelte';
	import PostHeader from './PostHeader.svelte';
	import PostActions from './PostActions.svelte';

	export let posts: TimelinePost[] = [];
	let selection: string = '';

	let moreOpen: { [key: string]: boolean } = {};
	$: console.log(moreOpen);

	function openPost(event: Event, post: TimelinePost) {
		if (selection.length > 0) {
			return;
		}
		if (Object.values(moreOpen).some((v) => v)) {
			return;
		}
		if (event instanceof MouseEvent) {
			goto(`/${post.author.username}/post/${post.id}`);
		}

		if (event instanceof KeyboardEvent) {
			if (event.key === 'Enter' || event.key === ' ') {
				goto(`/${post.author.username}/post/${post.id}`);
			}
		}
	}

	function handleSelectionChange() {
		selection = document.getSelection()?.toString() ?? '';
	}
</script>

<svelte:document on:selectionchange={handleSelectionChange} />

<section class="flex flex-col">
	{#each posts as post}
		<article on:selectionchange>
			<div
				tabindex="0"
				role="button"
				on:click={(event) => openPost(event, post)}
				on:keydown={(event) => openPost(event, post)}
				class="flex flex-col gap-2 p-4 border-b border-neutral"
			>
				<PostHeader {post} bind:open={moreOpen[post.id.toString()]} />
				<p>
					{post.content}
				</p>
				<PostActions {post} />
			</div>
		</article>
	{/each}
</section>
