<script lang="ts">
	import BottomNavbar from '$components/BottomNavbar.svelte';
	import Navbar from '$components/Navbar.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import SearchIcon from '~icons/material-symbols/search';
	import '../app.css';
	import type { LayoutData } from './$types';
	import LogoutModal from '$components/LogoutModal.svelte';

	export let data: LayoutData;

	$: console.log(data);

	$: authStatus = data.signedIn;
	$: avatar = data
</script>

<!--Modals-->
<LogoutModal />

<div class="flex flex-col h-screen">
	<header>
		<nav>
			<Navbar />
		</nav>
	</header>
	<div class="flex-1 flex h-full justify-center">
		<div class="flex w-full max-w-6xl">
			<!--Left sidebar-->
			<aside class="hidden md:block basis-1/5 p-2">
				<SideNavbar {authStatus} />
			</aside>
			<!--Main content-->
			<main class="flex-1 md:border-x border-neutral">
				<slot />
			</main>
			<!--Right sidebar-->
			<aside class="hidden md:block basis-1/5 p-2">
				<div class="flex flex-col gap-2">
					<label class="input input-bordered flex items-center gap-2">
						<SearchIcon class="w-6 h-6" />
						<input disabled type="search" placeholder="Search" class="grow" />
					</label>
					<div class="card w-full bg-neutral text-neutral-content">
						<div class="card-body">
							<h2 class="card-title">Welcome!</h2>
							<p>This is a little demo of a microblogging platform made with SvelteKit.</p>
							<a href="https://github.com/Waoweens/Demo/tree/main/microblog" class="link">Source code</a>
							<p>&copy; <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" class="link">GNU GPL v3.0</a></p>
						</div>
					</div>
				</div>
			</aside>
		</div>
	</div>
	<footer>
		<nav class="md:hidden">
			<BottomNavbar {authStatus} />
		</nav>
	</footer>
</div>
