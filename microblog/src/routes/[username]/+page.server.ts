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

	// fetch user's posts
	const posts = await db.post.findMany({
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			createdAt: true,
			content: true,
			author: {
				select: {
					id: true,
					username: true,
					displayName: true,
					profileImage: true
				}
			},
			_count: {
				select: {
					yeahs: true,
					replies: true,
					reposts: true,
					quotes: true
				}
			},
			yeahs: {
				where: {
					userId: user.id
				},
				select: {
					id: true
				}
			}
		},
	});

	const processedPosts: TimelinePost[] = posts.map((post) => ({
		id: post.id,
    	createdAt: post.createdAt,
    	content: post.content,
    	author: post.author,
    	_count: post._count,
		yeahed: post.yeahs.length > 0
	}));

	return {
		user,
		posts: processedPosts
	}
};
