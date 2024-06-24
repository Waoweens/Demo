<script lang="ts">
	import { enhance } from '$app/forms';
	import BackButton from '$components/BackButton.svelte';
	import type { ActionData } from './$types';
	import IconWarning from '~icons/material-symbols/warning';
	import IconUpload from '~icons/material-symbols/upload';
	import IconError from '~icons/material-symbols/error-outline';
	import IconName from '~icons/material-symbols/person';
	import { Cropper, type CropperInstance, type CropperDefaultProps } from 'svelte-cropper';
	import { getContext } from 'svelte';
	import type { PassedUser } from '$lib/common/util';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';

	const user = getContext<PassedUser>('user');

	export let form: ActionData;
	export let displayName: string = $user?.displayName ?? '';
	export let bio: string = $user?.bio ?? '';


	let profileFile: FileList | null = null;
	let profileSrc: string | null = null;
	let profileModal: HTMLDialogElement | null = null;

	let bannerFile: FileList | null = null;
	let bannerSrc: string | null = null;
	let bannerModal: HTMLDialogElement | null = null;

	$: console.log(profileFile);

	let cropper: CropperInstance | null = null;
	const profileProps: CropperDefaultProps = {
		viewMode: 1,
		aspectRatio: 1,
		autoCropArea: 1
	};
	const bannerProps: CropperDefaultProps = {
		viewMode: 1,
		aspectRatio: 3 / 1,
		autoCropArea: 1
	};

	function editProfile() {
		pushState('/settings/profile/pfp', {
			showEditProfile: true
		});
	}
	$: $page.state.showEditProfile ? profileModal?.showModal() : profileModal?.close();

	function editBanner() {
		pushState('/settings/profile/banner', {
			showEditBanner: true
		});
		if (bannerModal) bannerModal.showModal();
	}
	$: $page.state.showEditBanner ? bannerModal?.showModal() : bannerModal?.close();

	function previewProfileImage() {
		const reader = new FileReader();
		reader.onload = (e) => {
			profileSrc = e.target!.result?.toString() ?? null;
		};
		reader.readAsDataURL(profileFile![0]);
	}

	function previewBannerImage() {
		const reader = new FileReader();
		reader.onload = (e) => {
			bannerSrc = e.target!.result?.toString() ?? null;
		};
		reader.readAsDataURL(bannerFile![0]);
	}
</script>

<BackButton crumbs={['Settings', 'Profile']} />
<noscript>
	<div class="alert alert-warning rounded-none">
		<IconWarning class="text-xl" />
		<span>JavaScript disabled. Image editor not available. Images uploaded as-is.</span>
	</div>
</noscript>

{#if $page.state.showEditProfile}
	<dialog bind:this={profileModal} class="modal" on:close={() => history.back()}>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Edit profile picture</h3>
			<div class="py-4">

			</div>
			<div class="modal-action">
				<form method="dialog">
					<button type="submit" class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}

{#if $page.state.showEditBanner}
	<dialog bind:this={bannerModal} class="modal" on:close={() => history.back()}>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Test!</h3>
			<p class="py-4">Modal content.</p>
			<div class="modal-action">
				<form method="dialog">
					<button type="submit" class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}

<div class="flex flex-col">
	<img class="aspect-[3/1] w-full" src={$user?.bannerImage} alt="user banner" />
	<div class="avatar ml-8 bottom-16 -mb-16">
		<div class="w-32 rounded-full border-4 border-base-100">
			<img src={$user?.profileImage} alt="user avatar" />
		</div>
	</div>
	<div class="flex flex-col lg:flex-row gap-2 self-end relative mr-4 bottom-12 -mb-12">
		<a
			href="/settings/profile/pfp"
			on:click|preventDefault={editProfile}
			class="btn btn-sm btn-outline"
		>
			<IconUpload class="text-lg" />
			Profile Picture
		</a>
		<a
			href="/settings/profile/banner"
			on:click|preventDefault={editBanner}
			class="btn btn-sm btn-outline"
		>
			<IconUpload class="text-lg" />
			Banner
		</a>
	</div>
</div>
<div class="p-4 flex flex-col gap-4">
	<!-- <div>
		<div class="label">
			<span class="label-text">Profile Picture</span>
		</div>
		{#if profileFile}
			<Cropper class="h-44" bind:cropper src={profileSrc ?? ''} cropper_props={profileProps}
			></Cropper>
		{/if}
		<input
			name="profileImage"
			class="file-input file-input-bordered w-full"
			type="file"
			accept="image/*"
			bind:files={profileFile}
			on:change={previewProfileImage}
		/>

		<div class="label">
			<span class="label-text">Profile Banner</span>
		</div>
		{#if bannerSrc}
			<Cropper class="h-44" bind:cropper src={bannerSrc ?? ''} cropper_props={bannerProps}
			></Cropper>
		{/if}
		<input
			name="bannerImage"
			class="file-input file-input-bordered w-full"
			type="file"
			accept="image/*"
			bind:files={bannerFile}
			on:change={previewBannerImage}
		/>
	</div> -->
	<form use:enhance enctype="multipart/form-data" method="post" class="flex flex-col gap-4">
		{#if form?.error}
			<div class="alert alert-error p-4" role="alert">
				<IconError class="text-xl" />
				<span>{form.error}</span>
			</div>
		{/if}

		<label class="form-control">
			<div class="label">
				<span class="label-text">Display Name</span>
				<span class="label-text {displayName.length >= 50 ? 'text-error' : ''}">
					{displayName.length}/50
				</span>
			</div>
			<div class="input input-bordered flex items-center gap-2">
				<IconName class="text-xl" />
				<input
					maxlength="50"
					type="text"
					class="grow"
					name="displayName"
					placeholder="Display name..."
					bind:value={displayName}
				/>
			</div>
		</label>

		<div class="form-control">
			<div class="label">
				<span class="label-text">Bio</span>
				<span class="label-text {bio.length >= 280 ? 'text-error' : ''}">
					{bio.length}/280
				</span>
			</div>
			<textarea
				maxlength="280"
				class="textarea textarea-bordered h-44"
				name="displayName"
				placeholder="Bio..."
				bind:value={bio}
			/>
		</div>

		<button type="submit" class="btn btn-primary w-full">Save</button>
	</form>
</div>
