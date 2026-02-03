import iconsRawList from './icons'
import type { Icon } from './types'

/**
 * Use this composable to load icons list.
 *
 * Icons list is fetched from remote URL.
 * The list is an array of objects with following properties:
 * - id: number
 * - name: string
 * - svgUrl: string
 * - library: string
 *
 * The composable returns an object with two properties:
 * - iconsList: Ref<Icon[]> - the list of icons
 * - prepareData: () => Promise<void> - a function to refetch the list
 *
 * @returns {{ iconsList: Ref<Icon[]>, prepareData: () => Promise<Icon[]> }}
 */
export function useIconsLoader() {
  const iconsList = ref<Icon[]>([])

  const extractIconData = (key: string) => {
    const parts = key.split('_')

    const realLibNames: { [key: string]: string } = {
      a: 'antd',
      b: 'carbon',
      fa: 'fa',
      f: 'fluent',
      i4: 'ionicons4',
      i5: 'ionicons5',
      m: 'material',
      t: 'tabler',
    }

    const realIconFormats: { [key: string]: string } = {
      F1: 'Filled',
      O1: 'Outlined',
      O2: 'Outline',
      R1: 'Round',
      S1: 'Sharp',
      T1: 'Twotone',
      R2: 'Regular',
    }

    function restoreIconFormat(filename: string): string {
      return filename.replace(/(F1|O1|O2|R1|S1|T1|R2)(?=$|\.)/, (match) => {
        return realIconFormats[match] || match
      })
    }

    return [
      restoreIconFormat(parts.length > 1 ? parts[1] : parts[0]),
      parts.length > 1 ? realLibNames[parts[0]] : '',
    ]
  }

  const oneMoment = () => {
    return new Promise((resolve) => setTimeout(resolve))
  }

  const prepareData = async () => {
    let i = 1
    for (const value of iconsRawList) {
      if (i && i % 5000 === 0) {
        await oneMoment()
      }
      const [name, library] = extractIconData(value)
      iconsList.value.push({
        id: i,
        name: name,
        svgUrl: `https://raw.githubusercontent.com/noeGnh/vue3-icon-picker/master/packages/vue3-icon-picker/src/assets/sicons/${library}/${name}.svg`,
        library: library,
      })
      i += 1
    }

    return iconsList.value
  }

  prepareData()

  return {
    iconsList,
    prepareData,
  }
}

/**
 * Checks if the given string is a valid SVG document.
 *
 * @param {string} input - The string to be checked.
 * @return {boolean} Returns true if the string is a valid SVG document, false otherwise.
 */
export function isSVG(input: string): boolean {
  // @ts-ignore
  const svgRegex = /^\s*<svg\b[^>]*>.*<\/svg>\s*$/is

  try {
    if (svgRegex.test(input)) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, 'image/svg+xml')

      const parserErrors = doc.getElementsByTagName('parsererror')
      if (parserErrors.length > 0) {
        return false
      }

      const svgElements = doc.getElementsByTagName('svg')
      return svgElements.length > 0 && svgElements[0].parentNode === doc
    }
    return false
  } catch (e) {
    return false
  }
}
