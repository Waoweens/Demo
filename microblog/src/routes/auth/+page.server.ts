import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { snowflake } from '$lib/common/util';
import db from '$lib/server/db';
import { lucia } from '$lib/server/auth';

export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!username)
			return fail(400, {
				message: 'auth/username-missing'
			});

		if (!password)
			return fail(400, {
				message: 'auth/password-missing'
			});

		if (password !== confirmPassword)
			return fail(400, {
				message: 'auth/password-mismatch'
			});

		// check if the username is already taken
		if (
			!(await db.user.findUnique({
				where: {
					username
				}
			}))
		)
			return fail(400, {
				message: 'auth/username-taken'
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

		redirect(302, '/');
	},
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!username)
			return fail(400, {
				message: 'auth/username-missing'
			});

		if (!password)
			return fail(400, {
				message: 'auth/password-missing'
			});

		const user = await db.user.findUnique({
			where: {
				username
			}
		});
		if (!user)
			return fail(400, {
				message: 'auth/invalid-credentials'
			});

		const valid = await Bun.password.verify(password, user.passwordHash);
		if (!valid)
			return fail(400, {
				message: 'auth/invalid-credentials'
			});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401)
		}

		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
};
