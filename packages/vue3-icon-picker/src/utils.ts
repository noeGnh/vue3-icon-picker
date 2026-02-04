import type { Ref } from 'vue'

import {
  ICONS_ASSETS_URL,
  ICONS_LIST_URL,
  ICONS_STORAGE_KEY,
} from './constants'
// import iconsRawList from './icons'
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
export function useIconsLoader(): {
  iconsList: Ref<Icon[]>
  prepareData: () => Promise<Icon[]>
} {
  const iconsList = ref<Icon[]>([])

  const extractIconData = (key: string) => {
    const parts: string[] = key.split('_')

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
      restoreIconFormat(parts.length > 1 ? parts[1]! : parts[0]!),
      parts.length > 1 && parts[0] ? realLibNames[parts[0]] : '',
    ]
  }

  const oneMoment = () => {
    return new Promise((resolve) => setTimeout(resolve))
  }

  const prepareData = async () => {
    let iconsRawList: string[] = []
    try {
      iconsRawList = JSON.parse(localStorage.getItem(ICONS_STORAGE_KEY) || '[]')

      if (!iconsRawList || iconsRawList.length === 0) {
        const response = await fetch(ICONS_LIST_URL)
        iconsRawList = await response.json()
        localStorage.setItem(ICONS_STORAGE_KEY, JSON.stringify(iconsRawList))
      }
    } catch (error: any) {
      //
    }

    let i = 1
    for (const value of iconsRawList) {
      if (i && i % 5000 === 0) {
        await oneMoment()
      }
      const [name, library] = extractIconData(value)
      if (name && library) {
        iconsList.value.push({
          id: i,
          name: name,
          svgUrl: `${ICONS_ASSETS_URL}/${library}/${name}.svg`,
          library: library,
        })
        i += 1
      }
    }

    return iconsList.value
  }

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
      return svgElements.length > 0 && svgElements[0]?.parentNode === doc
    }
    return false
  } catch (e) {
    return false
  }
}

/**
 * Loosely validate a URL `string`.
 *
 * @param {string} string
 * @return {boolean}
 */
export function isURL(string: string): boolean {
  /**
   * RegExps.
   * A URL must match #1 and then at least one of #2/#3.
   * Use two levels of REs to avoid REDOS.
   */
  var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/

  var localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
  var nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/

  if (typeof string !== 'string') {
    return false
  }

  var match = string.match(protocolAndDomainRE)
  if (!match) {
    return false
  }

  var everythingAfterProtocol = match[1]
  if (!everythingAfterProtocol) {
    return false
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true
  }

  return false
}
