import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * SVG map:
 * key   = `${folder}__${fileNameWithoutExtension}`
 * value = raw SVG content
 */
type SvgMap = Record<string, string>

const assetsDir = path.join(__dirname, '../src/assets/sicons')

function buildSvgMap(
  dir: string,
  map: SvgMap = {},
  currentFolder?: string
): SvgMap {
  const entries: fs.Dirent[] = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      buildSvgMap(fullPath, map, entry.name)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.svg')) {
      if (!currentFolder) {
        throw new Error(`SVG file "${entry.name}" must be inside a subfolder`)
      }

      const key = path.basename(entry.name, '.svg')
      const prefixedKey = `${currentFolder}__${key}`

      if (prefixedKey in map) {
        throw new Error(`Duplicate SVG key detected: "${prefixedKey}"`)
      }

      map[prefixedKey] = fs.readFileSync(fullPath, 'utf-8')
    }
  }

  return map
}

// Script execution

const svgMap: SvgMap = buildSvgMap(assetsDir)

// Generate a TypeScript file that can be imported directly
const outputPath = path.join(__dirname, '../icons-map.json')

const fileContent = `${JSON.stringify(svgMap, null, 2)}`

fs.writeFileSync(outputPath, fileContent, 'utf-8')

console.log(`${Object.keys(svgMap).length} SVG files processed`)
