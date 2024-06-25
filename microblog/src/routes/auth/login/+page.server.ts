import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import { verify } from '@node-rs/argon2';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) return redirect(302, '/auth/redirect-root');
	return {
		meta: {
			title: 'Sign in'
		}
	};
};

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

		// const valid = await Bun.password.verify(password, user.passwordHash);
		const valid = await verify(user.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

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

		return redirect(302, '/auth/redirect-root');
	}
};
