<script lang="ts">
	import ReplyIcon from '~icons/material-symbols/chat-bubble-outline';
	import RepostIcon from '~icons/material-symbols/repeat';
	import YeahIcon from '~icons/material-symbols/add-reaction-outline';
	import YeahFilledIcon from '~icons/material-symbols/add-reaction';
	import ShareIcon from '~icons/material-symbols/share';
	import type { TimelinePost } from '$lib/common/util';
	import { enhance } from '$app/forms';

	export let post: TimelinePost;
</script>

<footer class="flex justify-between">
	<div class="flex items-center">
		<div class="tooltip tooltip-bottom" data-tip="Reply">
			<button
				class="btn btn-sm btn-ghost"
				on:click|stopPropagation
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
				on:click|stopPropagation
				on:keydown|stopPropagation
			>
				<RepostIcon class="text-xl" />
				<span>{post._count.reposts + post._count.quotes}</span>
			</button>
		</div>
	</div>
	<form use:enhance method="post" action="/submit/{post.yeahed ? 'delete' : 'create'}?/yeah" class="flex items-center">
		<input type="hidden" class="hidden" name="postId" value={post.id} />
		<div class="tooltip tooltip-bottom" data-tip={post.yeahed ? 'Unyeah' : 'Yeah!'}>
			<button
				type="submit"
				class="btn btn-sm btn-ghost"
				on:click|stopPropagation
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
	</form>
	<div class="flex items-center">
		<div class="tooltip tooltip-bottom" data-tip="Share">
			<button
				class="btn btn-square btn-sm btn-ghost"
				on:click|stopPropagation
				on:keydown|stopPropagation
			>
				<ShareIcon class="text-xl" />
			</button>
		</div>
	</div>
</footer>
