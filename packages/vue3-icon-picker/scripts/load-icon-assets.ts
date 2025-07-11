import fs from 'fs'
import { glob } from 'glob'
import path from 'path'
import { optimize, Output } from 'svgo'
import { minify } from 'terser'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function minifyTypeScript(code: string): Promise<string> {
  const result = await minify(code, {
    module: true, // If using ES modules
    compress: true,
    mangle: true,
  })
  return result.code || code // Fallback if minification fails
}

async function copyAndOptimizeSVGs(): Promise<void> {
  try {
    const files = await glob(
      path.join(__dirname, '../node_modules/@sicons/**/*.svg')
    )

    // Generate path mapping for plugin
    const icons = files
      .map((file) => {
        const fileName = path.basename(file).replace(/\.svg$/, '')
        const folderName = path.dirname(file).split('/').pop() || ''

        const shorterLibNames = {
          antd: 'a',
          carbon: 'b',
          fa: 'fa',
          fluent: 'f',
          ionicons4: 'i4',
          ionicons5: 'i5',
          material: 'm',
          tabler: 't',
        }

        const shorterIconFormats = {
          Filled: 'F1',
          Outlined: 'O1',
          Outline: 'O2',
          Round: 'R1',
          Sharp: 'S1',
          Twotone: 'T1',
          Regular: 'R2',
        }

        const shortIconFormat = (filename: string) => {
          for (const [longFormat, shortFormat] of Object.entries(
            shorterIconFormats
          )) {
            if (filename.endsWith(longFormat)) {
              filename = filename.slice(0, -longFormat.length) + shortFormat
            }
          }
          return filename
        }

        return `  '${shorterLibNames[folderName]}_${shortIconFormat(
          fileName
        )}',`
      })
      .join('\n')

    // Generate icons.ts file
    const iconsContent = `// Auto-generated icons file
export default [
${icons}
]
`
    const iconsOutputPath = path.join(__dirname, '../src/icons.ts')

    const minifiedIconsContent = await minifyTypeScript(iconsContent)

    fs.mkdirSync(path.dirname(iconsOutputPath), { recursive: true })
    fs.writeFileSync(iconsOutputPath, minifiedIconsContent)

    // Copy and optimize SVG files
    const assetsDir = path.join(__dirname, '../src/assets/sicons')

    for (const file of files) {
      const data: string = fs.readFileSync(file, 'utf-8')

      const result: Output = optimize(data, {
        multipass: true,
        plugins: [
          // Basic cleaning (no risk)
          'removeDoctype',
          'removeXMLProcInst',
          'removeComments',
          'removeMetadata',
          'removeEditorsNSData',

          // SVG structure (conservative)
          'collapseGroups',
          'mergePaths',

          // Styles and attributes (safe)
          'convertStyleToAttrs',
          'convertColors',
          'convertPathData',
          'convertTransform',

          // Selective removal
          'removeUselessDefs',
          'removeEmptyContainers',

          // Geometric optimization
          'cleanupNumericValues',
          'cleanupListOfValues',
        ],
      })

      // Calculate the relative path from node_modules/@sicons
      const relativePath: string = path.relative(
        path.join(__dirname, '../node_modules/@sicons'),
        file
      )

      const destPath: string = path.join(assetsDir, relativePath)

      fs.mkdirSync(path.dirname(destPath), { recursive: true })

      fs.writeFileSync(destPath, result.data)

      console.log(`Optimized and copied: ${relativePath}`)
    }

    console.log('All SVG files processed successfully!')
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing SVG files:', error.message)
    } else {
      console.error('Unknown error occurred:', error)
    }
  }
}

copyAndOptimizeSVGs()
