import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { UPLOAD_API_URL } from '$env/static/private';
import db from '$lib/server/db';
import sharp from 'sharp';
import { fileTypeFromBuffer } from 'file-type/core';
import { snowflake } from '$lib/common/util';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();

		const displayName = formData.get('displayName') as string;
		const bio = formData.get('bio') as string;

		const profileData = formData.get('profileImage') as Blob;
		const profileCrop = formData.get('profileCrop') as string;
		const bannerData = formData.get('bannerImage') as Blob;
		const bannerCrop = formData.get('bannerCrop') as string;

		const user = await db.user.update({
			where: { id: locals.user.id },
			data: {
				displayName,
				bio
			}
		});

		if (!user) return fail(500, { error: 'Failed to update user' });

		if (!profileData && !bannerData) return redirect(302, '/profile');

		if (profileData) {
			if (!profileCrop) return fail(400, { error: 'Missing profile crop data' });

			const buf = await profileData.arrayBuffer();
			const type = await fileTypeFromBuffer(buf);
			if (!type || !type.mime.startsWith('image/'))
				return fail(500, { error: 'Invalid image type' });

			const crop: Cropper.Data = JSON.parse(profileCrop);
			const image = await sharp(buf)
				.extract({
					left: Math.round(crop.x),
					top: Math.round(crop.y),
					width: Math.round(crop.width),
					height: Math.round(crop.height)
				})
				.toBuffer();
			const newType = await fileTypeFromBuffer(image);

			const file = new File([image], `${snowflake.generate()}.${newType?.ext}`, {
				type: type.mime
			});

			const path = `${UPLOAD_API_URL}/user/${locals.user.id}/${file.name}`;
			const response = await fetch(path, {
				method: 'PUT',
				body: file
			});
			if (!response.ok)
				return fail(500, {
					error: 'Failed to upload profile image: ' + response.statusText
				});

			const update = await db.user.update({
				where: { id: locals.user.id },
				data: {
					profileImage: path
				}
			});
			if (!update) return fail(500, { error: 'Failed to update user' });
		}

		if (bannerData) {
			if (!bannerCrop) return fail(400, { error: 'Missing banner crop data' });

			const buf = await bannerData.arrayBuffer();
			const type = await fileTypeFromBuffer(buf);
			if (!type || !type.mime.startsWith('image/'))
				return fail(500, { error: 'Invalid image type' });

			const crop: Cropper.Data = JSON.parse(bannerCrop);
			const image = await sharp(buf)
				.extract({
					left: Math.round(crop.x),
					top: Math.round(crop.y),
					width: Math.round(crop.width),
					height: Math.round(crop.height)
				})
				.toBuffer();
			const newType = await fileTypeFromBuffer(image);

			const file = new File([image], `${snowflake.generate()}.${newType?.ext}`, {
				type: type.mime
			});

			const path = `${UPLOAD_API_URL}/user/${locals.user.id}/${file.name}`;
			const response = await fetch(path, {
				method: 'PUT',
				body: file
			});
			if (!response.ok)
				return fail(500, {
					error: 'Failed to upload banner image: ' + response.statusText
				});

			const update = await db.user.update({
				where: { id: locals.user.id },
				data: {
					bannerImage: path
				}
			});
			if (!update) return fail(500, { error: 'Failed to update user' });
		}

		return redirect(302, '/profile');
	}
};
