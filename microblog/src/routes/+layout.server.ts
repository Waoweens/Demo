import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) return { signedIn: false };

	return {
		signedIn: true,
		username: event.locals.user.username,
		userId: event.locals.user.id
	};
};
