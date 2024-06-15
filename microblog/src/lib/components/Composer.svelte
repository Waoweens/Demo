<script lang="ts">
	import { enhance } from "$app/forms";

	export let controls = false;
	let content: string = '';
	const characterLimit = 280;

	function showControls() {
		controls = true;
	}

	function textAreaInput(event: Event) {
		// Resize the textarea as the user types
		const textarea = event.target as HTMLTextAreaElement;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight + 2}px`;

	}

	$: isOverLimit = content.length > characterLimit;
</script>

<section class="border p-2">
	<form use:enhance action="/?/compose" method="post">
		<textarea
			on:focus={showControls}
			on:input={textAreaInput}
			bind:value={content}
			class="textarea w-full resize-none text-xl"
			name="content"
			placeholder="What's happening?"
		/>
		{#if controls}
			<div class="flex justify-between">
				<div>
					<button type="submit" class="btn btn-sm btn-primary">Attach Media</button>
				</div>
				<div class="flex gap-3 items-center">
					<span class="{isOverLimit ? 'text-error' : ''}">{content.length}/{characterLimit}</span>
					<button type="submit" class="btn btn-sm btn-primary" disabled={isOverLimit}>Post</button>
				</div>
			</div>
		{/if}
	</form>
</section>
