/* eslint-disable no-console, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-implicit-any-catch, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */

import fs from 'node:fs'

const cwd = process.cwd()

const folderfiles = fs.readdirSync(`${cwd}/project/routes`)
const rootLayout = folderfiles.filter(file => file.includes('__layout.svelte'))
const pathToRootLayout = `${cwd}/project/routes/__layout.svelte`

try {
  if (rootLayout.length === 0) {
    throw new Error(`
			No Root Layout Found.
		`)
  } else {
    const layout = fs.readFileSync(pathToRootLayout, {
      encoding: 'utf8',
    })
    const writeToFile = (filePath: string, data: string): void => fs.writeFileSync(filePath, data)
    const isImportPresent = layout.includes("import '../styles/tailwind.postcss';")
    if (isImportPresent) {
      console.log('Import already present')
    } else {
      const updatedLayout = layout.replace(
        '// Start: External Imports',
        `// Start: External Imports
	import '../styles/tailwind.postcss';`,
      )
      writeToFile(pathToRootLayout, updatedLayout)
    }
  }
} catch (error) {
  console.error(error)
}
