import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from 'lucia';
import db from "./db";
import { dev } from "$app/environment";
import { decl } from "postcss";
import type { DatabaseUserAttributes } from "$lib/common/util";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			createdAt: attributes.createdAt,
			displayName: attributes.displayName,
			bio: attributes.bio,
			profileImage: attributes.profileImage,
			bannerImage: attributes.bannerImage
		}
	}
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		UserId: bigint;
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}
