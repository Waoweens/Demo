<script lang="ts">
	import Timeline from '$components/Timeline.svelte';
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
	import IconEdit from '~icons/material-symbols/edit';
	import IconFollow from '~icons/material-symbols/person-add';
	import type { PassedUser } from '$lib/common/util';
	import BackButton from '$components/BackButton.svelte';
	import { pageMeta } from '$lib/stores/page';

	export let data: PageData;

	$pageMeta = {
		pageTitle: `${data.user.displayName} (@${data.user.username})`,
		ogTitle: `${data.user.displayName} (@${data.user.username})`,
		description: data.user.bio,
		twImage: data.user.profileImage,
		date: data.user.createdAt.toString()
	};

	const user = getContext<PassedUser>('user');
</script>

<div>
	<BackButton title={data.user.displayName ?? 'Unknown user'} />
	<div class="flex flex-col border-b border-neutral">
		<img class="aspect-[3/1] w-full" src={data.user.bannerImage} alt="user banner" />
		<div class="avatar ml-8 bottom-16 -mb-16">
			<div class="w-32 rounded-full border-4 border-base-100">
				<img src={data.user.profileImage} alt="user avatar" />
			</div>
		</div>
		<div class="flex gap-2 self-end relative mr-4 bottom-12 -mb-12">
			{#if $user?.id === data.user.id}
				<button class="btn btn-outline">
					<IconEdit />
					Edit Profile
				</button>
			{:else}
				<button class="btn btn-primary">
					<IconFollow />
					Follow
				</button>
			{/if}
		</div>
		<div class="flex flex-col m-4 gap-2">
			<div class="flex flex-col">
				<h1 class="text-3xl font-bold">{data.user.displayName}</h1>
				<p class="text-lg text-slate-600 dark:text-slate-300">@{data.user.username}</p>
			</div>
			<p>{data.user.bio}</p>
		</div>
		<div role="tablist" class="tabs tabs-lg tabs-bordered [--tab-border:0.2rem]">
			<button type="button" role="tab" class="tab tab-active tab-custom-color">Posts</button>
			<button type="button" role="tab" class="tab">Replies</button>
			<button type="button" role="tab" class="tab">Yeahs</button>
		</div>
	</div>
	<Timeline posts={data.posts} />
	<div class="text-center my-4">End of feed</div>
</div>
