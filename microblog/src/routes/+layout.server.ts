import type { DatabaseUserAttributes } from '$lib/common/util';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) return {};

	return {
		user: {
			id: event.locals.user.id,
			username: event.locals.user.username,
			createdAt: event.locals.user.createdAt,
			displayName: event.locals.user.displayName,
			bio: event.locals.user.bio,
			profileImage: event.locals.user.profileImage,
			bannerImage: event.locals.user.bannerImage
		} as DatabaseUserAttributes
	};
};
