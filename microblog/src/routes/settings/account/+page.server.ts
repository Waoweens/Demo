import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = () => {
	return {
		meta: {
			title: 'Account — Settings'
		}
	}
}