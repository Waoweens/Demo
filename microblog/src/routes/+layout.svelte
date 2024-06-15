<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
import "../app.css"
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
</div>