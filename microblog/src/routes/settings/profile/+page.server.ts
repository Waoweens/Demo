import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { UPLOAD_API_URL } from '$env/static/private';
import db from '$lib/server/db';
import { fileTypeFromBlob, fileTypeFromBuffer } from 'file-type/core';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();
		const displayName = formData.get('displayName') as string;
		const bio = formData.get('bio') as string;
		const profileImage = formData.get('profileImage');
		const bannerImage = formData.get('bannerImage') as Blob;

		// update user
		const user = await db.user.update({
			where: { id: locals.user.id },
			data: {
				displayName,
				bio
			}
		});
		if (!user) return fail(500, { error: 'Failed to update user' });

		// if (!profileImage && !bannerImages) return redirect(302, '/profile');

		console.log('file upload triggered')
		console.log(profileImage)
		// console.log(await fileTypeFromBuffer(bytes))

		// create file from blobs

		// https://github.com/sindresorhus/file-type/issues/632
		// await (new Blob(['test'])).arrayBuffer()


		// const profileType = await fileTypeFromBlob(profileImage);
		// const bannerType = await fileTypeFromBlob(bannerImages);

		// if (!profileType?.mime.startsWith('image/'))
		// 	return fail(400, { error: 'Profile image must be an image' });
		// if (!bannerType?.mime.startsWith('image/'))
		// 	return fail(400, { error: 'Banner image must be an image' });

		// const profileImage = new File([profileImage], `profile.${profileType.ext}`, {
		// 	type: profileType.mime
		// });
		// const bannerImage = new File([bannerImages], `banner.${bannerType.ext}`, {
		// 	type: bannerType.mime
		// });

		// const profileImagePath = `${UPLOAD_API_URL}/user/${locals.user.id}/${profileImage.name}`;
		// const bannerImagePath = `${UPLOAD_API_URL}/user/${locals.user.id}/${bannerImage.name}`;

		// upload images
		// PUT https://files.meowcorp.net/upload/path/to/file
		// const profileResponse = await fetch(profileImagePath, {
		// 	method: 'PUT',
		// 	body: profileImage
		// });
		// const bannerResponse = await fetch(bannerImagePath, {
		// 	method: 'PUT',
		// 	body: bannerImage
		// });
		// if (!profileResponse.ok) return fail(500, { error: 'Failed to upload profile image' });
		// if (!bannerResponse.ok) return fail(500, { error: 'Failed to upload banner image' });

		// update user
		// const userImages = await db.user.update({
		// 	where: { id: locals.user.id },
		// 	data: {
		// 		profileImage: profileImagePath,
		// 		bannerImage: bannerImagePath,
		// 	}
		// });
		// if (!userImages) return fail(500, { error: 'Failed to update user' });

		// return redirect(302, '/profile');
	}
};
