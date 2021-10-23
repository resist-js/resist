#!/usr/bin/env node

/* eslint-disable sonarjs/no-nested-template-literals, sonarjs/cognitive-complexity, sonarjs/no-duplicate-string, no-console */

// @final
//
// NOTE: Do not make changes here without approval.

import prompts from 'prompts'
import { bold, cyan, green, red } from 'kleur/colors'

import { IsRepo, IsURL, CopyTemplate, CWD, CWDName, IsCWDEmpty, Launch, IsDockerRunning } from '@resistjs/utils'

import Replacer from './replacer'

/** @type {!string} */
const URL = 'https://resistjs.dev/'

/** @type {!object} */
const messages = {
  disclaimer: `
  ${bold(cyan(`Welcome to resist.js ❄️ - Project: ${CWDName}`))}
  ${bold(red('This is beta software; expect bugs and missing features.'))}
  If you encounter a problem, open an issue on ${cyan(`${URL}docs/issues`)} if none exists already.
  `,
  copied: bold(green('✔ Copied the skeleton from the closet')),
  nextSteps: '\nNext steps:',
  toStop: `\n\tTo stop your project from running, from the console type ${bold(cyan(`resist stop ${CWDName}`))}`,
  toStart: `\tTo start your project, from the console type ${bold(cyan(`resist start ${CWDName}`))}`,
  toRemove: `\tTo remove your project, from the console type ${bold(cyan(`resist sweep ${CWDName}`))}`,
  toUninstall: `\tTo uninstall resist.js completely, from the console type ${bold(cyan(`resist uninstall`))}`,
  forHelp: `\n${bold('Need help?')} Visit us at ${URL}docs\n`,
  pleaseWait: bold(green(`\nPlease wait while we get things ready... (it may take a few moments)\n\n`)),
  dockerFail: bold(
    red(
      `\nDocker must be installed and running, please install and start it, then try again. (https://docs.docker.com/get-docker)`,
    ),
  ),
}

/**
 * Entry point.
 */
async function main() {
  console.log(messages.disclaimer)

  if (!IsDockerRunning()) {
    console.log(messages.dockerFail)
    return
  }

  await IsCWDEmpty(async () => {
    return await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Directory not empty. Continue?',
      initial: false,
    })
  })

  const APP_AUTHOR = await prompts({
    type: 'text',
    name: 'value',
    message: 'Author of project?',
    validate: value => (value?.length > 0 ? true : `A project author is required.`),
  })

  const APP_DESCRIPTION = await prompts({
    type: 'text',
    name: 'value',
    message: 'Description of your project?',
    validate: value => (value?.length > 0 ? true : `A project description is required.`),
  })

  const APP_VERSION = await prompts({
    type: 'text',
    name: 'value',
    initial: '1.0.0',
    message: 'Starting version of project?',
    validate: value => (value?.length > 0 ? true : `A project version is required.`),
  })

  const APP_LICENSE = await prompts({
    type: 'select',
    name: 'value',
    initial: 1,
    message: 'Project license type?',
    choices: [
      { title: 'No license', value: 'UNLICENSED' },
      { title: 'From LICENSE.md', value: 'SEE LICENSE IN LICENSE.md' },
      { title: 'MIT', value: 'MIT' },
    ],
  })

  const APP_HOMEPAGE = await prompts({
    type: 'text',
    name: 'value',
    message: 'Project homepage? (optional)',
    validate: value =>
      value?.length === 0 || IsURL(value) ? true : `Project homepage must be a valid url (i.e. ${URL}).`,
  })

  const APP_REPO = await prompts({
    type: 'text',
    name: 'value',
    message: 'Project repository? (optional)',
    validate: value =>
      value?.length === 0 || IsRepo(value)
        ? true
        : `Project repository must be a valid url (i.e. github:nyrion/resist-js).`,
  })

  const APP_BUGS_URL = await prompts({
    type: 'text',
    name: 'value',
    message: 'Project bugs url? (optional)',
    validate: value =>
      value?.length === 0 || IsURL(value) ? true : `Project bugs url must be a valid url (i.e. ${URL}).`,
  })

  const APP_KEYWORDS = await prompts({
    type: 'text',
    name: 'value',
    initial: '',
    message: 'Keywords for project? (optional)',
  })

  const packageJSON = {
    name: CWDName,
    description: APP_DESCRIPTION.value,
    version: APP_VERSION.value,
    homepage: APP_HOMEPAGE.value,
    bugs: APP_BUGS_URL.value,
    repository: APP_REPO.value,
    license: APP_LICENSE.value,
    author: APP_AUTHOR.value,
    keywords: APP_KEYWORDS.value.split(','),
    browser: 'window',
    type: 'module',
    scripts: {
      prepare: 'husky install',
      prebuild: 'rimraf .svelte-kit && rimraf build',
      'remove-css': 'node --loader ts-node/esm ./config/svelte/scripts/js/remove-css-imports.ts',
      'add-css': 'node --loader ts-node/esm ./config/svelte/scripts/js/add-css-imports.ts',
      'dev:postcss':
        'cross-env TAILWIND_MODE=build postcss ./project/styles/global.scss -o ./project/public/global.css -w',
      'dev:postcss:tailwindcss':
        'cross-env STYLE_TYPE=TAILWIND TAILWIND_MODE=build postcss ./project/styles/tailwind.postcss -o ./project/public/tailwind.css -w',
      dev: 'npm run add-css && svelte-kit dev --host=0.0.0.0',
      'build:scss': 'sass --no-source-map ./project/styles/global.scss ./project/public/global.css',
      'build:postcss':
        'cross-env TAILWIND_MODE=build NODE_ENV=production cross-env-shell postcss ./project/public/global.css -o ./project/public/global.css',
      'build:postcss:taildwindcss':
        'cross-env TAILWIND_MODE=build NODE_ENV=production STYLE_TYPE=TAILWIND postcss ./project/styles/tailwind.postcss -o ./project/public/tailwind.css',
      'build:sveltekit': 'cross-env-shell svelte-kit build',
      build: 'run-s remove-css build:scss build:postcss build:postcss:taildwindcss build:sveltekit',
      storybook: 'start-storybook -p 6006',
      'build-storybook': 'build-storybook',
    },
    dependencies: {},
    devDependencies: {
      '@emotion/core': '^11.0.0',
      '@mdx-js/react': '^1.6.22',
      react: '^17.0.2',
      '@resistjs/server': '^1.0.0-next.1',
      '@resistjs/svelte-kit': '^1.0.0-next.206',
      'svelte-materialify': '^0.3.11',
      '@babel/core': '^7.15.8',
      '@rollup/plugin-json': '^4.1.0',
      '@rollup/plugin-strip': '^2.1.0',
      '@storybook/addon-actions': '^6.4.0-alpha.22',
      '@storybook/addon-cssresources': '^6.2.9',
      '@storybook/addon-docs': '6.4.0-alpha.22',
      '@storybook/addon-essentials': '^6.4.0-alpha.22',
      '@storybook/addon-info': '^5.3.21',
      '@storybook/addon-links': '^6.4.0-alpha.22',
      '@storybook/addon-postcss': '^2.0.0',
      '@storybook/addon-svelte-csf': '^1.1.0',
      '@storybook/preset-scss': '^1.0.3',
      '@storybook/svelte': '^6.3.10',
      '@tailwindcss/typography': '^0.4.1',
      '@types/node': '^16.7.2',
      '@types/node-fetch': '^2.5.12',
      '@types/nprogress': '^0.2.0',
      '@types/yargs': '^17.0.2',
      '@typescript-eslint/eslint-plugin': '^4.29.3',
      '@typescript-eslint/parser': '^4.29.3',
      autoprefixer: '^10.3.3',
      chota: '^0.8.0',
      'cross-env': '^7.0.3',
      cssnano: '^5.0.6',
      'cssnano-preset-advanced': '^5.1.4',
      'date-fns': '^2.23.0',
      dotenv: '^10.0.0',
      'eslint-config-prettier': '^8.1.0',
      'eslint-plugin-svelte3': '^3.2.0',
      husky: '^7.0.2',
      'image-size': '^1.0.0',
      'lint-staged': '^11.1.2',
      'node-fetch': '^2.6.1',
      'npm-run-all': '^4.1.5',
      nprogress: '^0.2.0',
      postcss: '^8.3.5',
      'postcss-cli': '^8.3.1',
      'postcss-import': '^14.0.2',
      'postcss-load-config': '^3.1.0',
      'postcss-nested': '^5.0.6',
      'postcss-scss': '^4.0.0',
      'prettier-plugin-svelte': '^2.2.0',
      rimraf: '^3.0.2',
      sass: '^1.38.1',
      'sass-loader': '^12.1.0',
      'storybook-builder-vite': '^0.1.0',
      svelte: '^3.43.1',
      'svelte-awesome': '^2.4.2',
      'svelte-check': '^2.2.7',
      'svelte-chota': '^1.8.6',
      'svelte-loader': '^3.1.2',
      'svelte-preprocess': '^4.7.4',
      tailwindcss: '^2.2.4',
      'tiny-glob': '^0.2.9',
      'ts-node': '^10.2.1',
      tslib: '^2.0.0',
      typescript: '^4.0.0',
      'vite-imagetools': '^3.6.8',
      'vite-plugin-html': '^2.1.1',
      yargs: '^17.1.1',
    },
    engines: {
      node: '>= 16.11.1',
    },
  }

  CopyTemplate(CWD, packageJSON, import.meta.url)
  Replacer(CWD)

  console.log(messages.copied)
  console.log(messages.nextSteps)
  console.log(messages.toStop)
  console.log(messages.toStart)
  console.log(messages.toRemove)
  console.log(messages.toUninstall)
  console.log(messages.forHelp)

  console.log(messages.pleaseWait)

  Launch(
    `cd ${CWD}/packages/project && pnpm install -g @resistjs/conformances @resistjs/bins && resist-conform svelte && git init && git config core.hooksPath .githooks && git checkout --orphan documentation && git rm -rf . && git commit --allow-empty -m "🌻" && git checkout master && node ./config/start ${CWDName}`,
  )
}

main()
