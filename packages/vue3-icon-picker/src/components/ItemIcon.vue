<script setup lang="ts">
  export interface Props {
    dataUrl: string | null
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

  const fetchData = async () => {
    isLoading.value = true

    const response = await fetch(props.dataUrl || '')

    svgCode.value = await response.text()

    /* const cacheData = {
              svg: svgCode.value,
              timestamp: Date.now(),
            }
            localStorage.setItem(type.name, JSON.stringify(cacheData)) */
  }

  watch(
    () => props.dataUrl,
    async (val) => {
      try {
        fetchData()
      } catch (error) {
        //
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
