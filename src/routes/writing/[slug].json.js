import { getPostBySlug } from '$lib/site/posts';

export async function get({ params }) {
	const post = await getPostBySlug(params.slug);

	return {
		body: JSON.stringify(post)
	};
}
