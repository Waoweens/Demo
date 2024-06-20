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
	import { pageMeta, pageHistory, isGoingBack } from '$lib/stores/page';
	import { navigating } from '$app/stores';

	export let data: LayoutData;

	const user = writable<DatabaseUserAttributes | undefined>();
	$: user.set(data.user);
	setContext('user', user);

	beforeNavigate(({ from }) => {
		if (!$isGoingBack) pageHistory.set([...get(pageHistory), from?.url.pathname ?? '/']);
	})
	afterNavigate(() => {
		if ($isGoingBack) $isGoingBack = false;
	});
</script>

<svelte:head>
	<title>{$pageMeta.pageTitle === '' ? 'Unknown page' : $pageMeta.pageTitle} &mdash; Microblog</title>
	<meta name="application-name" content="Microblog">
	<meta name="generator" content="MicroblogWeb">
	<meta name="description" content="{$pageMeta.description}">
	<meta name="article:published_time" content="{$pageMeta.date}">

	<!-- Open Graph -->
	<meta property="og:site_name" content="Microblog">
	<meta property="og:type" content="article">
	<meta property="og:url" content="{$pageMeta.url}">
	<meta property="og:title" content="{$pageMeta.ogTitle}">
	<meta property="og:description" content={$pageMeta.description ?? ''}>

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:label1" content="Posted At">
	<meta name="twitter:value1" content="{$pageMeta.date}">
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
