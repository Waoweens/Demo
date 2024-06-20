import db from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TimelinePost } from '$lib/common/util';

export const load: PageServerLoad = async ({ params, locals }) => {
	let userId = BigInt(0);
	if (locals.user) userId = locals.user.id; 
	const username = params.username;

	if (username === "profile") {
		if (!locals.user) error(401, 'Unauthorized');
		redirect(302, `/${locals.user.username}`);
	};

	// fetch db for params.username
	const user = await db.user.findUnique({
		where: {
			username
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


	if (!user) error(404, 'User not found');

	// fetch user's posts
	const posts = await db.post.findMany({
		where: {
			authorId: user.id
		},
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
					userId
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
		posts: processedPosts,
		meta: {
			title: `${user.displayName} (@${user.username})`,
			description: user.bio,
			ogType: 'profile',
			ogTitle: `${user.displayName} (@${user.username})`,
			ogDescription: user.bio,
			profileUsername: user.username,
			twitterCard: 'summary',
			twitterImage: user.profileImage,
			twitterValues: [
				{ label: 'Joined', value: user.createdAt.toISOString() },
			]
		}
	}
};
