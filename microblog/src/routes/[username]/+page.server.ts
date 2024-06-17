import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	console.log('params', params);

	// fetch db for params.username
	const user = await db.user.findUnique({
		where: {
			username: params.username
		},
		select: {
			id: true,
			username: true,
			createdAt: true,
			displayName: true,
			bio: true,
			profileImage: true,
			bannerImage: true
		}
	});

	console.log('user', user);

	if (!user) error(404, 'User not found');

	return {
		user
	}
};
