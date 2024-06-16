<script lang="ts">
	import ReplyIcon from '~icons/material-symbols/chat-bubble-outline';
	import RepostIcon from '~icons/material-symbols/repeat';
	import YeahIcon from '~icons/material-symbols/add-reaction-outline';
	import YeahFilledIcon from '~icons/material-symbols/add-reaction';
	import ShareIcon from '~icons/material-symbols/share';
	import type { Post } from '@prisma/client';
	import { goto } from '$app/navigation';
	import type { TimelinePost } from '$lib/common/util';
	import RelativeTime from './RelativeTime.svelte';

	export let authStatus: boolean = false;
	export let posts: TimelinePost[] = [];

	$: console.log(posts);

	function openPost() {
		goto(`/user/{}`);
	}

	function openPostKey(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			console.log('Open Post');
		}
	}

	function reply() {
		console.log('Reply');
	}

	function repost() {
		console.log('Repost');
	}

	function yeah(post: TimelinePost) {
		if (post.yeahed) {
			console.log('Unyeah');
		} else {
			console.log('Yeah!');
		}
	}

	function share() {
		console.log('Share');
	}
</script>

<section>
	{#each posts as post}
		<div tabindex="0" role="button" on:click={openPost} on:keydown={openPostKey}>
			<article class="flex flex-col gap-2 p-4 border-b border-neutral">
				<header class="flex items-center gap-2">
					<a href="/user/{post.author.id}" on:click|stopPropagation on:keydown|stopPropagation>
						<div class="avatar">
							<div class="w-12 rounded-full">
								<img src={post.author.profileImage} alt="Avatar" />
							</div>
						</div>
					</a>
					<div>
						<a class="font-bold" href="/user/{post.author.id}">
							<span class="font-bold">{post.author.displayName}</span>
						</a>
						<div class="text-slate-600 dark:text-slate-300">
							<a href="/user/{post.author.id}">@{post.author.username}</a>
							<span role="separator">—</span>
							<a href="/user/{post.author.id}/post/{post.id}">
								<RelativeTime date={post.createdAt} />
							</a>
						</div>
					</div>
				</header>

				<p>
					{post.content}
				</p>

				<footer class="flex justify-between">
					<div class="flex items-center">
						<div class="tooltip tooltip-bottom" data-tip="Reply">
							<button
								class="btn btn-sm btn-ghost"
								on:click|stopPropagation={reply}
								on:keydown|stopPropagation
							>
								<ReplyIcon class="text-xl" />
								<span>{post._count.replies}</span>
							</button>
						</div>
					</div>
					<div class="flex items-center">
						<div class="tooltip tooltip-bottom" data-tip="Repost">
							<button
								class="btn btn-sm btn-ghost"
								on:click|stopPropagation={repost}
								on:keydown|stopPropagation
							>
								<RepostIcon class="text-xl" />
								<span>{post._count.reposts + post._count.quotes}</span>
							</button>
						</div>
					</div>
					<div class="flex items-center">
						<div>
							<div class="tooltip tooltip-bottom" data-tip={post.yeahed ? 'Unyeah' : 'Yeah!'}>
								<button
									class="btn btn-sm btn-ghost"
									on:click|stopPropagation={() => yeah(post)}
									on:keydown|stopPropagation
								>
									{#if post.yeahed}
										<YeahFilledIcon class="text-xl text-success" />
									{:else}
										<YeahIcon class="text-xl" />
									{/if}
									<span>{post._count.yeahs}</span>
								</button>
							</div>
						</div>
					</div>
					<div class="flex items-center">
						<div>
							<div class="tooltip tooltip-bottom" data-tip="Share">
								<button
									class="btn btn-square btn-sm btn-ghost"
									on:click|stopPropagation={share}
									on:keydown|stopPropagation
								>
									<ShareIcon class="text-xl" />
								</button>
							</div>
						</div>
					</div>
				</footer>
			</article>
		</div>
	{/each}
</section>
