import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import db from "$lib/server/db";
import { snowflake } from "$lib/common/util";

export const actions: Actions = {
	post: async ({ locals, request}) => {
		if (!locals.user) return fail(401);
		const data = await request.formData();
		const content = data.get('content') as string;
		if (!content) return fail(400, { error: 'Missing content' });

		const post = await db.post.create({
			data: {
				id: snowflake.generate(),
				authorId: locals.user.id,
				content,
			}
		})
		if (!post) return fail(500, { error: 'Failed to create post' });

		return {
			status: 201,
			post
		}
	}
}