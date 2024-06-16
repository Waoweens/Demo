<script lang="ts">
	import BottomNavbar from '$components/BottomNavbar.svelte';
	import Navbar from '$components/Navbar.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex flex-col h-screen">
	<header>
		<nav>
			<Navbar />
		</nav>
	</header>
	<div class="flex-1 flex h-full justify-center">
		<div class="flex w-full max-w-6xl">
			<aside class="hidden md:block basis-1/5">
				<SideNavbar authStatus={data.signedIn} />
			</aside>
			<main class="flex-1 border-x border-neutral">
				<slot />
			</main>
			<aside class="hidden md:block basis-1/5">Right sidebar</aside>
		</div>
	</div>
	<footer>
		<nav class="md:hidden">
			<BottomNavbar />
		</nav>
	</footer>
</div>
