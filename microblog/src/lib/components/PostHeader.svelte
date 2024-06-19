<script lang="ts">
	import type { PassedUser, TimelinePost } from '$lib/common/util';
	import RelativeTime from './RelativeTime.svelte';
	import IconMore from '~icons/material-symbols/more-horiz';
	import IconDelete from '~icons/material-symbols/delete-outline';
	import IconReport from '~icons/material-symbols/flag-outline';
	import IconInfo from '~icons/material-symbols/info-outline';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';

	export let post: TimelinePost;
	export let open: boolean = false;

	const user = getContext<PassedUser>('user');
</script>

<header class="flex justify-between">
	<div class="flex items-center gap-2">
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
	</div>
	<div>
		<div class="dropdown dropdown-end">
			<div class="tooltip tooltip-bottom" data-tip="More">
				<div
					tabindex="0"
					role="button"
					class="btn btn-circle btn-ghost"
					on:click|stopPropagation
					on:keydown|stopPropagation
					on:focus={() => open = true}
					on:blur={() => open = false}
				>
					<IconMore class="text-xl" />
				</div>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
				{#if post.author.id === $user?.id}
					<form method="post" use:enhance action="/submit/delete?/post">
						<input type="hidden" class="hidden" name="authorId" value={post.author.id}>
						<input type="hidden" class="hidden" name="postId" value={post.id}>
						<li>
							<button
								type="submit"
								class="btn-outline btn-error flex"
								on:click|stopPropagation
								on:keydown|stopPropagation
							>
								<IconDelete class="text-xl" />
								Delete
							</button>
						</li>
					</form>
				{/if}
				{#if post.author.id !== $user?.id}
					<li>
						<button on:click|stopPropagation on:keydown|stopPropagation>
							<IconReport class="text-xl" />
							Report
						</button>
					</li>
				{/if}
				<li>
					<button on:click|stopPropagation on:keydown|stopPropagation>
						<IconInfo class="text-xl" />
						Info
					</button>
				</li>
			</ul>
		</div>
	</div>
</header>
