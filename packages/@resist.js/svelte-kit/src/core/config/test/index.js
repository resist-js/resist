import { join } from 'path';
import { fileURLToPath } from 'url';

import * as assert from 'uvu/assert';
import { test } from 'uvu';

import { remove_keys } from '../../../utils/object.js';
import { load_config } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

/**
 * @param {string} path
 */
async function testLoadDefaultConfig(path) {
	const cwd = join(__dirname, 'fixtures', path);

	const config = await load_config({ cwd });
	remove_keys(config, ([, v]) => typeof v === 'function');

	assert.equal(config, {
		extensions: ['.svelte'],
		kit: {
			adapter: null,
			amp: false,
			appDir: '_app',
			files: {
				assets: join(cwd, 'static'),
				hooks: join(cwd, 'src/hooks'),
				lib: join(cwd, 'src/lib'),
				routes: join(cwd, 'src/routes'),
				serviceWorker: join(cwd, 'src/service-worker'),
				template: join(cwd, 'src/app.html')
			},
			floc: false,
			host: null,
			hostHeader: null,
			hydrate: true,
			package: {
				dir: 'package',
				emitTypes: true
			},
			serviceWorker: {},
			paths: { base: '', assets: '' },
			prerender: {
				crawl: true,
				enabled: true,
				entries: ['*'],
				force: undefined,
				onError: 'fail',
				pages: undefined
			},
			router: true,
			ssr: true,
			target: null,
			trailingSlash: 'never'
		}
	});
}

test('load default config (cjs)', async () => {
	await testLoadDefaultConfig('default-cjs');
});

test('load default config (esm)', async () => {
	await testLoadDefaultConfig('default-esm');
});

test('errors on loading config with incorrect default export', async () => {
	let errorMessage = null;
	try {
		const cwd = join(__dirname, 'fixtures', 'export-string');
		await load_config({ cwd });
	} catch (/** @type {any} */ e) {
		errorMessage = e.message;
	}

	assert.equal(
		errorMessage,
		'Unexpected config type "string", make sure your default export is an object.'
	);
});

test.run();
