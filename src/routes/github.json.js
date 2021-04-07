import fetch from 'node-fetch';
import { dev } from '$app/env';
import { loadEnv } from '$lib/environment';

if (dev) {
	loadEnv();
}

export async function get() {
	const _contributed = [
		'gatsbyjs/gatsby',
		'dotansimha/graphql-code-generator',
		'pikapkg/snowpack',
		'orogene/orogene'
	];

	const _built = [
		'react-easy-flip',
		'use-animate-presence',
		'springframes',
		'will-it-render',
		'looc',
		'tsx-ray',
		'umca',
		'useFetch',
		'wasm-game-of-life',
		'gatsby-remark-shiki',
		'rollup-plugin-web-imports'
	];

	const builtResponses = _built.map((repo) =>
		fetch(`https://api.github.com/repos/jlkiri/${repo}`, {
			headers: { Authorization: `Bearer ${process.env['GITHUB_API_TOKEN']}` }
		})
	);

	const contributedResponses = _contributed.map((repo) =>
		fetch(`https://api.github.com/repos/${repo}`, {
			headers: { Authorization: `Bearer ${process.env['GITHUB_API_TOKEN']}` }
		})
	);

	const responses = await Promise.all(
		[...contributedResponses, ...builtResponses].map((f) => f.then((r) => r.json()))
	);

	const repositories = responses.map((repo) => {
		return {
			name: repo.name,
			description: repo.description,
			url: repo['html_url'],
			stars: repo['stargazers_count'],
			fullName: repo['full_name']
		};
	});

	const built = repositories.filter((r) => _built.includes(r.name));

	const contributed = repositories.filter((r) => _contributed.includes(r.fullName));

	return {
		body: JSON.stringify({ contributed, built })
	};
}
