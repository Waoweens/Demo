import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import db from "$lib/server/db";
import { lucia } from "$lib/server/auth";
import { snowflake } from "$lib/common/util";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!username)
			return fail(400, {
				error: 'Missing username'
			});

		if (!password)
			return fail(400, {
				error: 'Missing password'
			});

		if (password !== confirmPassword)
			return fail(400, {
				error: 'Passwords do not match'
			});

		// check if the username is already taken
		if (
			await db.user.findUnique({
				where: {
					username
				}
			})
		)
			return fail(400, {
				error: 'Username already taken'
			});

		// Register the user

		const userId = snowflake.generate();
		const passwordHash = await Bun.password.hash(password);

		await db.user.create({
			data: {
				id: userId,
				username,
				passwordHash
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, `/user/${userId}/edit`)
	}
}