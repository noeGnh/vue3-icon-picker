<script setup lang="ts">
  import isUrl from 'is-url'

  import { getIconFromCache, setIconInCache } from '../cache'
  import { isSVG, useIconsLoader } from '../utils'

  export interface Props {
    data: string
    color?: string
    size?: number | string
  }

  const props = withDefaults(defineProps<Props>(), {
    color: undefined,
    size: 24,
  })

  const color = computed(() => props.color)
  const size = computed(() =>
    typeof props.size == 'number' ? props.size + 'px' : props.size || 'unset'
  )

  const svgCode = ref()
  const isLoading = ref(false)

  var abortController: AbortController | null = null

  const fetchData = async (url: string) => {
    if (abortController) {
      abortController.abort()
    }

    const filename = url.split('/').pop()
    const name = filename?.split('.').slice(0, -1).join('.') || 'icon'

    const cached = getIconFromCache(name)
    if (cached) {
      svgCode.value = cached
      return
    }

    if (isLoading.value) return

    isLoading.value = true
    abortController = new AbortController()

    try {
      const response = await fetch(url, {
        signal: abortController.signal,
      })

      const svg = await response.text()

      setIconInCache(name, svg)
      svgCode.value = svg
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(`Failed to load icon ${name}`, error)
        svgCode.value = `<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#eee"/></svg>`
      }
    } finally {
      isLoading.value = false
      abortController = null
    }
  }

  onUnmounted(() => {
    if (abortController) {
      abortController.abort()
    }
  })

  watch(
    () => props.data,
    async (val) => {
      if (isUrl(val)) {
        fetchData(val)
      } else if (isSVG(val)) {
        svgCode.value = val
      } else {
        const { prepareData } = useIconsLoader()

        const iconsList = await prepareData()

        const url =
          iconsList?.find((icon) => icon.name == val)?.svgCodeUrl || ''

        fetchData(url)
      }
    },
    {
      immediate: true,
    }
  )
</script>

<template>
  <i v-html="svgCode"></i>
</template>

<style scoped>
  ::v-deep(svg) {
    display: block;
    width: v-bind(size);
    height: v-bind(size);
    color: v-bind(color);
  }
</style>
