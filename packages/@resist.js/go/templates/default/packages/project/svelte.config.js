/* jshint esversion: 9 */

// Imports
import { imagetools } from 'vite-imagetools'

import preprocess from 'svelte-preprocess'

// Adapters
import adapter from '@resistjs/server/src/adapter.mjs'

// Plugins
import { minifyHtml } from 'vite-plugin-html'
import strip from '@rollup/plugin-strip'
import json from '@rollup/plugin-json'

/** @type {import('@resistjs/svelte-kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
      scss: {
        prependData: `@import 'project/styles/variables/index.scss';`,
        outputStyle: 'compressed',
      },
      preserve: ['ld+json'],
    }),
  ],

  kit: {
    appDir: '0',
    target: '#app',
    ssr: true,
    amp: false,
    adapter: adapter({
      out: '/usr/local/build',
      precompress: true,
    }),
    files: {
      assets: './project/public',
      hooks: './config/svelte/.hooks',
      routes: './project/routes',
      template: './config/svelte/.app.html',
    },
    prerender: {
      crawl: true,
      enabled: true,
      onError: 'fail',
      entries: ['*'],
    },
    vite: () => ({
      server: {
        watch: {
          usePolling: true,
        },
      },
      resolve: {
        alias: {},
      },
      envPrefix: ['VITE_', 'SNOWBURN_'],
      plugins: [strip(), minifyHtml(), json({ compact: true, preferConst: true }), imagetools({ force: true })],
    }),
  },
}

export default config
