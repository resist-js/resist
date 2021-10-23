/* eslint-disable no-console */
import fs from 'fs'

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
    const writeToFile = (filePath: string, data): void => fs.writeFileSync(filePath, data)
    const updatedLayout = layout.replace("import '../styles/tailwind.postcss';", '')
    writeToFile(pathToRootLayout, updatedLayout)
  }
} catch (error) {
  console.error(error)
}
