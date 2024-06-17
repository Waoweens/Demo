import type { TimelinePost } from '$lib/common/util.js';
import db from '$lib/server/db.js';

export const load = async (event) => {
	let userId = BigInt(0);
	if (event.locals.user) userId = event.locals.user.id;

	// get posts
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
		posts: processedPosts
	};
};
