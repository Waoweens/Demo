<script lang="ts">
	import ReplyIcon from '~icons/material-symbols/chat-bubble-outline';
	import RepostIcon from '~icons/material-symbols/repeat';
	import YeahIcon from '~icons/material-symbols/add-reaction-outline';
	import YeahFilledIcon from '~icons/material-symbols/add-reaction';
	import ShareIcon from '~icons/material-symbols/share';
	import type { TimelinePost } from '$lib/common/util';

	export let post: TimelinePost;

	function reply(post: TimelinePost) {
		console.log('Reply');
	}

	function repost(post: TimelinePost) {
		console.log('Repost');
	}

	function yeah(post: TimelinePost) {
		if (post.yeahed) {
			console.log('Unyeah');
		} else {
			console.log('Yeah!');
		}
	}

	function share(post: TimelinePost) {
		console.log('Share');
	}
</script>

<footer class="flex justify-between">
	<div class="flex items-center">
		<div class="tooltip tooltip-bottom" data-tip="Reply">
			<button
				class="btn btn-sm btn-ghost"
				on:click|stopPropagation={() => reply(post)}
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
				on:click|stopPropagation={() => repost(post)}
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
					on:click|stopPropagation={() => share(post)}
					on:keydown|stopPropagation
				>
					<ShareIcon class="text-xl" />
				</button>
			</div>
		</div>
	</div>
</footer>
