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

	let profileModal: HTMLDialogElement | null = null;
	let profileFile: FileList | null = null;
	let profileSrc: string | null = null;
	let profilePreview: string | null = null;
	let profileCrop: string | null = null;

	let bannerModal: HTMLDialogElement | null = null;
	let bannerFile: FileList | null = null;
	let bannerSrc: string | null = null;
	let bannerPreview: string | null = null;
	let bannerCrop: string | null = null;

	let cropper: CropperInstance | null = null;
	const profileProps: CropperDefaultProps = {
		viewMode: 1,
		aspectRatio: 1,
		autoCropArea: 1,
		crop: (event) => {
			console.log(event.detail)
		}
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

	function renderProfile() {
		const reader = new FileReader();
		reader.onload = (e) => {
			profileSrc = e.target!.result?.toString() ?? null;
		};
		reader.readAsDataURL(profileFile![0]);
	}

	function renderBanner() {
		const reader = new FileReader();
		reader.onload = (e) => {
			bannerSrc = e.target!.result?.toString() ?? null;
		};
		reader.readAsDataURL(bannerFile![0]);
	}

	function saveProfile() {
		if (profileFile && cropper) {
			const canvas = cropper.getCroppedCanvas();
			canvas.toBlob((blob) => {
				profilePreview = URL.createObjectURL(blob!);
			});
			profileCrop = JSON.stringify(cropper.getData())
		}
		history.back();
	}

	function saveBanner() {
		if (bannerFile && cropper) {
			const canvas = cropper.getCroppedCanvas();
			canvas.toBlob((blob) => {
				bannerPreview = URL.createObjectURL(blob!);
			});
			bannerCrop = JSON.stringify(cropper.getData())
		}
		history.back();
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
	<dialog bind:this={profileModal} class="modal" on:close={saveProfile}>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Edit profile picture</h3>
			<div class="py-4">
				<Cropper
					bind:cropper
					src={profileSrc ? profileSrc : $user?.profileImage ?? ''}
					cropper_props={profileProps}
				/>
				<input
					type="file"
					class="file-input w-full"
					bind:files={profileFile}
					on:change={renderProfile}
				/>
			</div>
			<div class="modal-action">
				<form method="dialog">
					<button type="submit" class="btn btn-outline">Confirm</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}

{#if $page.state.showEditBanner}
	<dialog bind:this={bannerModal} class="modal" on:close={saveBanner}>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Edit banner</h3>
			<div class="py-4">
				<Cropper
					bind:cropper
					src={bannerSrc ? bannerSrc : $user?.bannerImage ?? ''}
					cropper_props={bannerProps}
				/>
				<input
					type="file"
					class="file-input w-full"
					bind:files={bannerFile}
					on:change={renderBanner}
				/>
			</div>
			<div class="modal-action">
				<form method="dialog">
					<button type="submit" class="btn btn-outline">Confirm</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}

<div class="flex flex-col">
	<img class="aspect-[3/1] w-full" src={bannerPreview ?? $user?.bannerImage} alt="user banner" />
	<div class="avatar ml-8 bottom-16 -mb-16">
		<div class="w-32 rounded-full border-4 border-base-100">
			<img src={profilePreview ?? $user?.profileImage} alt="user avatar" />
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

<form enctype="multipart/form-data" method="post" use:enhance={({formData}) => {
	console.log('uploading:', profileFile?.[0], profileCrop, bannerFile?.[0], bannerCrop);
	if (profileFile) formData.append('profileImage', profileFile[0]);
	if (bannerFile) formData.append('bannerImage', bannerFile[0]);
	if (profileCrop) formData.append('profileCrop', profileCrop);
	if (bannerCrop) formData.append('bannerCrop', bannerCrop);
}}>
	<div class="p-4 flex flex-col gap-4">
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
				name="bio"
				placeholder="Bio..."
				bind:value={bio}
			/>
		</div>

		<button type="submit" class="btn btn-primary w-full">Save</button>
	</div>
</form>
