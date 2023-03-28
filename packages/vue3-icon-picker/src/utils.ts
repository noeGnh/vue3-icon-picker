import iconsRawList from './assets/icons.json'
import type { Icon } from './interface'

export function useIconsLoader() {
  const iconsList = ref<Icon[]>([])

  const extractIconData = (key: string) => {
    const parts = key.split('__')

    return [parts[0], parts.length > 1 ? parts[1] : '']
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
