import type { DatabaseUserAttributes } from '$lib/common/util';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) return {};

	return {
		user: {
			id: locals.user.id,
			username: locals.user.username,
			createdAt: locals.user.createdAt,
			displayName: locals.user.displayName,
			bio: locals.user.bio,
			profileImage: locals.user.profileImage,
			bannerImage: locals.user.bannerImage
		} as DatabaseUserAttributes
	};
};
