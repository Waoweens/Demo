<script lang="ts">
	import BottomNavbar from '$components/BottomNavbar.svelte';
	import Navbar from '$components/Navbar.svelte';
	import SideNavbar from '$components/SideNavbar.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import LogoutModal from '$components/LogoutModal.svelte';
	import { get, writable } from 'svelte/store';
	import type { DatabaseUserAttributes } from '$lib/common/util';
	import { setContext } from 'svelte';
	import RightBar from '$components/RightBar.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { pageHistory, isGoingBack } from '$lib/stores/page';
	import { navigating, page } from '$app/stores';

	export let data: LayoutData;

	const user = writable<DatabaseUserAttributes | undefined>();
	$: user.set(data.user);
	setContext('user', user);

	beforeNavigate(({ from }) => {
		if (!$isGoingBack) pageHistory.set([...get(pageHistory), from?.url.pathname ?? '/']);
	});
	afterNavigate(() => {
		if ($isGoingBack) $isGoingBack = false;
	});
</script>

<svelte:head>
	<title>{$page.data.meta?.title} &mdash; Microblog</title>
	<meta name="application-name" content={$page.data.meta?.applicationName} />
	<meta name="generator" content={$page.data.meta?.generator} />
	<meta name="description" content={$page.data.meta?.description} />
	
	<!-- Open Graph -->
	<meta property="og:site_name" content={$page.data.meta?.ogSiteName} />
	<meta property="og:type" content={$page.data.meta?.ogType} />
	<meta property="og:url" content={$page.data.meta?.ogUrl} />
	<meta property="og:title" content={$page.data.meta?.ogTitle} />
	<meta property="og:description" content={$page.data.meta?.ogDescription} />
	<meta property="og:image" content={$page.data.meta?.ogImage} />

	<!-- og:type article -->
	<meta name="article:author" content={$page.data.meta?.articleAuthor} />
	<meta name="article:published_time" content={$page.data.meta?.articlePublishedTime} />

	<!-- og:type profile -->
	<meta property="profile:username" content={$page.data.meta?.profileUsername} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content={$page.data.meta?.twitterCard} />
	<meta name="twitter:image" content={$page.data.meta?.twitterImage} />
	{#each $page.data.meta?.twitterValues ?? [] as { label, value }, i}
		<meta name="twitter:label{i}" content={label} />
		<meta name="twitter:value{i}" content={value} />
	{/each}
</svelte:head>

<!--Modals-->
<LogoutModal />

<div class="flex flex-col h-screen">
	<header>
		<nav>
			<Navbar />
		</nav>
	</header>
	<div class="flex-1 flex h-full justify-center overflow-hidden">
		<div class="flex w-full max-w-6xl overflow-hidden">
			<!--Left sidebar-->
			<aside class="hidden md:block basis-1/5 p-2">
				<SideNavbar />
			</aside>
			<!--Main content-->
			<main class="flex-1 md:border-x border-neutral overflow-auto">
				{#if $navigating}
					<div class="h-full w-full flex items-center justify-center">
						<span class="loading loading-spinner w-16"></span>
					</div>
				{:else}
					<slot />
				{/if}
			</main>
			<!--Right sidebar-->
			<aside class="hidden md:block basis-1/5 p-2">
				<RightBar />
			</aside>
		</div>
	</div>
	<footer>
		<nav class="md:hidden">
			<BottomNavbar />
		</nav>
	</footer>
</div>
