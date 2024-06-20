import type { DatabaseUserAttributes } from '$lib/common/util';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) return {};

	return {
		user: {
			id: locals.user.id,
			username: locals.user.username,
			createdAt: locals.user.createdAt,
			displayName: locals.user.displayName,
			bio: locals.user.bio,
			profileImage: locals.user.profileImage,
			bannerImage: locals.user.bannerImage
		} as DatabaseUserAttributes,
		// default meta tags
		meta: {
			// generic
			title: 'Unknown page',
			applicationName: 'Microblog',
			generator: 'A human generated this application',
			description: '',
			// Open Graph
			ogSiteName: 'Microblog',
			ogType: 'website',
			ogUrl: url.toString(),
			ogTitle: 'Microblog',
			ogDescription: '',
			ogImage: '',
			// og:type article
			articleAuthor: '',
			articlePublishedTime: '',
			// og:type profile
			profileUsername: '',
			// Twitter Card
			twitterCard: 'summary',
			twitterImage: '',
			twitterValues: [] as { label: string; value: string }[]
		}
	};
};
