import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from 'lucia';
import db from "./db";
import { dev } from "$app/environment";
import { decl } from "postcss";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
	}
}
