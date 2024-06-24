import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		console.log('received');
		if (!locals.user) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();
		const displayName = formData.get('displayName') as string;
		const bio = formData.get('bio') as string;
		const profileImage = formData.get('profileImage') as File;
		const bannerImage = formData.get('bannerImage') as File;

		// check if images are valid
		if (profileImage && !profileImage.type.startsWith('image'))
			return fail(400, { error: 'Invalid profile image' });

		if (bannerImage && !bannerImage.type.startsWith('image'))
			return fail(400, { error: 'Invalid banner image' });

		const profileImagePath = `/user/${locals.user.id}/profile.${profileImage.name.split('.').pop()}`;
		const bannerImagePath = `/user/${locals.user.id}/banner.${bannerImage.name.split('.').pop()}`;

		// upload images
		// PUT https://files.meowcorp.net/upload/path/to/file
		fetch(`https://files.meowcorp.net/upload/microblog${profileImagePath}`, {
			method: 'PUT',
			body: profileImage
		});
	}
};
