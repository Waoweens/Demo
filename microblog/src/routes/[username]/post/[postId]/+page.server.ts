import db from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { TimelinePost } from "$lib/common/util";

export const load: PageServerLoad = async ({ params, locals  }) => {
	let userId = BigInt(0);
	if (locals.user) userId = locals.user.id;
	const postId = params.postId;

	const post = await db.post.findUnique({
		where: {
			id: BigInt(postId)
		},
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

	if (!post) error(404, 'Post not found');

	const processedPost: TimelinePost = {
		id: post.id,
    	createdAt: post.createdAt,
    	content: post.content,
    	author: post.author,
    	_count: post._count,
		yeahed: post.yeahs.length > 0
	};

	return {
		post: processedPost
	}
}