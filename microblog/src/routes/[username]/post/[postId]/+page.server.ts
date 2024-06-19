import db from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params  }) => {
	const postId = params.postId;

	const post = await db.post.findUnique({
		where: {
			id: BigInt(postId)
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
		}
	});

	if (!post) error(404, 'Post not found');

	return {
		post
	}
}