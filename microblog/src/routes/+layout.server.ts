import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) return { signedIn: false };

	return {
		signedIn: true,
		userId: event.locals.user.id,
		username: event.locals.user.username,
		createdAt: event.locals.user.createdAt,
		displayName: event.locals.user.displayName,
		bio: event.locals.user.bio,
		profileImage: event.locals.user.profileImage,
		bannerImage: event.locals.user.bannerImage
	};
};
