import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import db from '$lib/server/db';
import { snowflake } from '$lib/common/util';

export const actions: Actions = {
	post: async ({ locals, request }) => {
		let userId = BigInt(0);
		let postId = BigInt(0);
		let authorId = BigInt(0);
		if (locals.user) userId = locals.user.id;
		const data = await request.formData();
		postId = BigInt(data.get('postId') as string);
		authorId = BigInt(data.get('authorId') as string);

		if (!postId || !authorId) return fail(400, { error: 'Missing postId or authorId' });
		if (userId !== authorId) return fail(403, { error: 'Unauthorized' });

		const deletePost = await db.post.delete({
			where: {
				id: postId,
			},
		});

		if (!deletePost) return fail(500, { error: 'Failed to delete post' });

		return {
			status: 200,
			message: 'Post deleted',
		};
	}
};
