import iconsRawList from './assets/icons.json'
import type { Icon } from './interface'

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
      F: 'Filled',
      O: 'Outlined',
      R: 'Round',
      S: 'Sharp',
      T: 'Twotone',
      E: 'Regular',
    }

    const restoreIconFormat = (filename: string) => {
      return filename.replace(/([A-Z])(?=\.\w+$)/, (match, shortFormat) => {
        return realIconFormats[shortFormat] || shortFormat
      })
    }

    return [
      restoreIconFormat(parts[0]),
      parts.length > 1 ? realLibNames[parts[1]] : '',
    ]
  }

  const oneMoment = () => {
    return new Promise((resolve) => setTimeout(resolve))
  }

  const prepareData = async () => {
    let i = 1
    for (const [key, value] of Object.entries(iconsRawList)) {
      if (i && i % 5000 === 0) {
        await oneMoment()
      }
      const [name, library] = extractIconData(key)
      iconsList.value.push({
        id: i,
        name: name,
        svgCode: value,
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
