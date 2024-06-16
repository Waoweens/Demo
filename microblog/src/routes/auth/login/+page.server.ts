import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import db from "$lib/server/db";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!username)
			return fail(400, {
				error: 'Missing username'
			});

		if (!password)
			return fail(400, {
				error: 'Missing password'
			});

		const user = await db.user.findUnique({
			where: {
				username
			}
		});
		if (!user)
			return fail(400, {
				error: 'Invalid username or password'
			});

		const valid = await Bun.password.verify(password, user.passwordHash);
		if (!valid)
			return fail(400, {
				error: 'Invalid username or password'
			});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/auth/redirect-root')
	}
}