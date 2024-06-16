<script lang="ts">
	import type { TimelinePost } from '$lib/common/util';
	import RelativeTime from './RelativeTime.svelte';

	export let post: TimelinePost;
</script>

<header class="flex items-center gap-2">
	<a href="/{post.author.username}" on:click|stopPropagation on:keydown|stopPropagation>
		<div class="avatar">
			<div class="w-12 rounded-full">
				<img src={post.author.profileImage} alt="Avatar" />
			</div>
		</div>
	</a>
	<div>
		<a
			class="font-bold"
			href="/{post.author.username}"
			on:click|stopPropagation
			on:keydown|stopPropagation
		>
			<span class="font-bold hover:link">{post.author.displayName}</span>
		</a>
		<div class="text-slate-600 dark:text-slate-300">
			<a
				href="/{post.author.username}"
				class="hover:link"
				on:click|stopPropagation
				on:keydown|stopPropagation>@{post.author.username}</a
			>
			<span role="separator">—</span>
			<a
				href="/{post.author.username}/post/{post.id}"
				class="hover:link"
				on:click|stopPropagation
				on:keydown|stopPropagation
			>
				<RelativeTime date={post.createdAt} />
			</a>
		</div>
	</div>
</header>
