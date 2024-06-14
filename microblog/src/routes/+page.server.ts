import db from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	return {
		test: db.session ? db.session : "Session does not exist"
	}
}