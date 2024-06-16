<script lang="ts">
	import BottomNavbar from '$components/BottomNavbar.svelte';
	import Navbar from '$components/Navbar.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import SearchIcon from '~icons/material-symbols/search';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: authStatus = data.signedIn;
</script>

<div class="flex flex-col h-screen">
	<header>
		<nav>
			<Navbar />
		</nav>
	</header>
	<div class="flex-1 flex h-full justify-center">
		<div class="flex w-full max-w-6xl">
			<aside class="hidden md:block basis-1/5 p-2">
				<SideNavbar {authStatus} />
			</aside>
			<main class="flex-1 md:border-x border-neutral">
				<slot />
			</main>
			<aside class="hidden md:block basis-1/5 p-2">
				<label class="input input-bordered flex items-center gap-2">
					<SearchIcon class="w-6 h-6" />
					<input disabled type="search" placeholder="Search" class="grow" />
				</label>
			</aside>
		</div>
	</div>
	<footer>
		<nav class="md:hidden">
			<BottomNavbar {authStatus} />
		</nav>
	</footer>
</div>
