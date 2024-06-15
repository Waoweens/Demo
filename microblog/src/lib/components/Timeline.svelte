<script lang="ts">
	import ReplyIcon from '~icons/material-symbols/chat-bubble-outline';
	import RepostIcon from '~icons/material-symbols/repeat';
	import YeahIcon from '~icons/material-symbols/add-reaction-outline';
	import ShareIcon from '~icons/material-symbols/share';
</script>

<section>
	<article class="flex flex-col gap-2 p-4 border-b border-neutral">
		<header class="flex items-center gap-2">
			<div class="avatar">
				<div class="w-12 rounded-full">
					<img src="https://placehold.co/200" alt="Avatar" />
				</div>
			</div>
			<div>
				<div>
					<span class="font-bold">Display Name</span>
				</div>
				<div class="text-slate-300">
					<span>@username</span>
					<span role="separator">—</span>
					<time>2 hours ago</time>
				</div>
			</div>
		</header>

		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deserunt velit culpa
			voluptates placeat. Recusandae sequi eligendi similique expedita in voluptatem exercitationem?
			Eligendi voluptatum unde ea? Molestias sequi id totam.
		</p>

		<footer class="flex justify-between">
			<div class="flex items-center">
				<div class="tooltip tooltip-bottom" data-tip="Reply">
					<button class="btn btn-square btn-sm btn-ghost">
						<ReplyIcon class="text-xl" />
					</button>
				</div>
				<span>3.4K</span>
			</div>
			<div class="flex items-center">
				<div class="tooltip tooltip-bottom" data-tip="Repost">
					<button class="btn btn-square btn-sm btn-ghost">
						<RepostIcon class="text-xl" />
					</button>
				</div>
				<span>1.2K</span>
			</div>
			<div class="flex items-center">
				<div>
					<div class="tooltip tooltip-bottom" data-tip="Yeah!">
						<button class="btn btn-square btn-sm btn-ghost">
							<YeahIcon class="text-xl" />
						</button>
					</div>
				</div>
				<span>10.9K</span>
			</div>
			<div class="flex items-center">
				<div>
					<div class="tooltip tooltip-bottom" data-tip="Share">
						<button class="btn btn-square btn-sm btn-ghost">
							<ShareIcon class="text-xl" />
						</button>
					</div>
				</div>
			</div>
		</footer>
	</article>
</section>
