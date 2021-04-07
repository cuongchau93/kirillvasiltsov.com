import fs from 'fs';
import path from 'path';

function parseEnv(env) {
	const lines = env.split('\n');
	const parsed = {};
	for (const line of lines.filter(Boolean)) {
		console.log(line);
		const [key, value] = line.split('=');
		console.log(key, value);
		parsed[key.trim()] = value.trim();
	}
	return parsed;
}

export function loadEnv() {
	const env = fs.readFileSync(path.join(process.cwd(), '.env'), { encoding: 'utf-8' });
	const parsed = parseEnv(env);
	for (const [k, v] of Object.entries(parsed)) {
		process.env[k] = v;
	}
}
