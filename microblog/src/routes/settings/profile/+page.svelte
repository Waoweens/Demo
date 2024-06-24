<script lang="ts">
	import { enhance } from '$app/forms';
	import BackButton from '$components/BackButton.svelte';
	import type { ActionData } from './$types';
	import IconWarning from '~icons/material-symbols/warning';
	import IconError from '~icons/material-symbols/error-outline';
	import IconName from '~icons/material-symbols/person';
	import { Cropper, type CropperInstance, type CropperDefaultProps } from 'svelte-cropper';

	export let form: ActionData;
	export let displayName: string = '';
	export let bio: string = '';

	let profileFile: FileList | null = null;
	let profileSrc: string | null = null;
	let bannerFile: FileList | null = null;
	let bannerSrc: string | null = null;

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

	function previewProfile() {
		const reader = new FileReader();
		reader.onload = (e) => {
			profileSrc = e.target!.result?.toString() ?? null;
		};
		reader.readAsDataURL(profileFile![0]);
	}

	function previewBanner() {
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

{#if form?.error}
	<div class="alert alert-error" role="alert">
		<IconError class="text-xl" />
		<span>{form.error}</span>
	</div>
{/if}
<div class="p-4 flex flex-col gap-4">
	<div>
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
			on:change={previewProfile}
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
			on:change={previewBanner}
		/>
	</div>
	<form use:enhance enctype="multipart/form-data" method="post" class="flex flex-col gap-4">
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
