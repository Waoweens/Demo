<script lang="ts">
	import { enhance } from '$app/forms';
	export let method: 'post' | 'reply';
	export let controls = false;
	let content: string = '';
	const characterLimit = 280;

	function showControls() {
		controls = true;
	}

	function textAreaInput(event: Event) {
		// Resize the textarea as the user types
		const textarea = event.target as HTMLTextAreaElement;
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight + 2}px`;
	}

	$: isOverLimit = content.length > characterLimit;
</script>

<section class="p-2">
	<form use:enhance action="/submit/create?/{method}" method="post">
		<textarea
			on:focus={showControls}
			on:input={textAreaInput}
			bind:value={content}
			class="textarea w-full resize-none text-xl {method === 'reply' ? 'h-3' : ''}"
			name="content"
			placeholder={method === 'post' ? 'What\'s happening?' : 'Reply to this post...'}
		/>
		{#if controls}
			<div class="flex justify-between">
				<div>
					<button disabled type="submit" class="btn btn-sm btn-primary">Attach Media</button>
				</div>
				<div class="flex gap-3 items-center">
					<span class={isOverLimit ? 'text-error' : ''}>{content.length}/{characterLimit}</span>
					<button
						type="submit"
						class="btn btn-sm btn-primary"
						disabled={isOverLimit || content.length === 0}
					>
						Post
					</button>
				</div>
			</div>
		{/if}
	</form>
</section>
