import { getAllPosts, orderByRecent } from '$lib/site/posts';

export async function get() {
	const posts = await getAllPosts();

	return {
		body: JSON.stringify(orderByRecent(Array.from(posts)))
	};
}
