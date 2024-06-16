<script lang="ts">
	import BottomNavbar from '$components/BottomNavbar.svelte';
	import Navbar from '$components/Navbar.svelte';
	import '../app.css';
</script>

<div class="flex flex-col h-screen">
	<header>
		<nav>
			<Navbar />
		</nav>
	</header>
	<div class="flex-1">
		<slot />
	</div>
	<footer>
		<nav class="md:hidden">
			<BottomNavbar />
		</nav>
	</footer>
</div>
