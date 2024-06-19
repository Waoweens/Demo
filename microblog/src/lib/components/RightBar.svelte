<script lang="ts">
	import SearchIcon from '~icons/material-symbols/search';
</script>

<div class="flex flex-col gap-2">
	<label class="input input-bordered flex items-center gap-2">
		<SearchIcon class="w-6 h-6" />
		<input disabled type="search" placeholder="Search" class="grow" />
	</label>
	<div class="card w-full bg-neutral text-neutral-content">
		<div class="card-body">
			<h2 class="card-title">Welcome!</h2>
			<p>This is a little demo of a microblogging platform made with SvelteKit.</p>
			<a href="https://github.com/Waoweens/Demo/tree/main/microblog" class="link"
				>Source code</a
			>
			<p>
				&copy; <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" class="link"
					>GNU GPL v3.0</a
				>
			</p>
		</div>
	</div>
</div>