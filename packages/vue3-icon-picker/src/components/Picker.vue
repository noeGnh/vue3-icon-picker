<script setup lang="ts">
  import { onClickOutside, useElementSize } from '@vueuse/core'
  import uniqBy from 'lodash.uniqby'
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

  import { getIconFromCache } from '../cache'
  import type { Icon, IconLibrary, ValueType } from '../types'
  import { useIconsLoader } from '../utils'
  import ItemIcon from './Icon.vue'

  export interface Props {
    searchPlaceholder?: string
    placeholder?: string
    modelValue: string | string[] | null
    multiple?: boolean
    iconLibrary?: IconLibrary | 'all' | IconLibrary[]
    selectedIconBgColor?: string
    selectedIconColor?: string
    displaySearch?: boolean
    multipleLimit?: number
    disabled?: boolean
    selectedItemsToDisplay?: number
    clearable?: boolean
    valueType?: ValueType
    includeIcons?: string[]
    excludeIcons?: string[]
    includeSearch?: string
    excludeSearch?: string
    emptyText?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    searchPlaceholder: 'Search',
    placeholder: undefined,
    multiple: false,
    iconLibrary: 'fa',
    selectedIconBgColor: '#d3d3d3',
    selectedIconColor: '#000000',
    displaySearch: true,
    multipleLimit: Infinity,
    disabled: false,
    selectedItemsToDisplay: 9,
    clearable: false,
    valueType: 'svg',
    includeIcons: () => [],
    excludeIcons: () => [],
    includeSearch: undefined,
    excludeSearch: undefined,
    emptyText: 'Nothing to show',
  })

  const emits = defineEmits(['change', 'update:modelValue'])

  const selectedIconBgColor = ref(props.selectedIconBgColor)
  const searchQuery = ref<string>('')
  const open = ref<boolean>(false)

  const { iconsList } = useIconsLoader()

  const filteredIcons = computed(() => {
    return uniqBy(
      uniqBy(
        iconsList.value.filter((icon) => {
          const belongsToIconLibs =
            (typeof props.iconLibrary === 'string' &&
              icon.library == props.iconLibrary) ||
            (Array.isArray(props.iconLibrary) &&
              props.iconLibrary.includes(icon.library as IconLibrary)) ||
            props.iconLibrary == 'all'

          const belongsToUserSearch =
            !searchQuery.value ||
            icon.name?.toLocaleLowerCase().includes(searchQuery.value)

          const belongsToIncludes =
            !props.includeIcons ||
            !props.includeIcons.length ||
            props.includeIcons.includes(icon.name)

          const belongsToIncludeSearch =
            !props.includeSearch ||
            icon.name?.toLocaleLowerCase().includes(props.includeSearch)

          const doesNotBelongsToExcludes =
            !props.excludeIcons ||
            !props.excludeIcons.length ||
            !props.excludeIcons.includes(icon.name)

          const doesNotBelongsToExcludeSearch =
            !props.excludeSearch ||
            !icon.name?.toLocaleLowerCase().includes(props.excludeSearch)

          return (
            belongsToIconLibs &&
            belongsToUserSearch &&
            belongsToIncludes &&
            belongsToIncludeSearch &&
            doesNotBelongsToExcludes &&
            doesNotBelongsToExcludeSearch
          )
        }),
        'svgCodeUrl'
      ),
      'name'
    )
  })

  const getValue = (icon: Icon) => {
    return props.valueType == 'name' ? icon.name : getIconFromCache(icon.name)
  }

  const getSvgCodeUrl = (value: string) => {
    return props.valueType == 'name'
      ? iconsList.value?.find((icon) => icon.name == value)?.svgCodeUrl || ''
      : value
  }

  const isIconSelected = (icon: Icon) => {
    if (props.multiple) {
      if (props.modelValue && props.modelValue.length)
        return (
          (props.modelValue as string[]).findIndex(
            (i: string) => i == getValue(icon)
          ) > -1
        )
      return false
    } else {
      if (!props.modelValue) return false
      return props.modelValue == getValue(icon)
    }
  }

  const onSelected = (icon: Icon | undefined) => {
    if (icon) {
      if (props.multiple) {
        if (props.modelValue && props.modelValue.length) {
          const tempArray = props.modelValue as string[]

          const index = (props.modelValue as string[]).findIndex(
            (i: string) => i == getValue(icon)
          )
          if (index > -1) {
            tempArray.splice(index, 1)
          } else {
            if (props.modelValue.length < props.multipleLimit) {
              if (typeof getValue(icon) != 'undefined')
                tempArray.push(getValue(icon) as string)
            }
          }
          emits('update:modelValue', tempArray)
          emits('change', tempArray, icon)
        } else {
          if (props.multipleLimit > 0) {
            emits('update:modelValue', [getValue(icon)])
            emits('change', [getValue(icon)], icon)
          }
        }
      } else {
        if (getValue(icon) == props.modelValue) {
          if (props.clearable) emits('update:modelValue', null)
        } else {
          emits('update:modelValue', getValue(icon))
        }
        emits('change', icon)
      }
    }
  }

  const picker = ref()
  onClickOutside(picker, () => (open.value = false))

  const scroller = ref()
  const { width } = useElementSize(scroller)

  const slots = useSlots()
  const hasSlot = (name: string) => {
    return !!slots[name]
  }
</script>

<template>
  <div ref="picker" class="v3ip__custom-select" @blur="open = false">
    <div
      class="v3ip__selected"
      :class="{ open: open, disabled: props.disabled }"
      @click="open = props.disabled ? false : !open">
      <template
        v-if="
          (!props.multiple && props.modelValue) ||
          (props.multiple && props.modelValue?.length)
        ">
        <div v-if="props.multiple" class="multiple">
          <template v-if="Array.isArray(props.modelValue)">
            <template
              v-for="(value, i) in (props.modelValue as string[] || [])"
              :key="i">
              <ItemIcon
                v-if="i < props.selectedItemsToDisplay"
                class="item"
                :data="getSvgCodeUrl(value)"
                :size="20"
                @click.stop="
                  onSelected(
                    iconsList?.find((icon: Icon) => getValue(icon) == value)
                  )
                " />
            </template>
            <div
              v-if="props.modelValue?.length > props.selectedItemsToDisplay"
              class="item">
              <b
                >+{{
                  props.modelValue?.length - props.selectedItemsToDisplay
                }}</b
              >
            </div>
          </template>
        </div>
        <ItemIcon
          v-else
          :data="getSvgCodeUrl(props.modelValue as string)"
          :size="20"
          @click.stop="
            onSelected(
              iconsList?.find(
                (icon: Icon) => getValue(icon) == props.modelValue
              )
            )
          " />
      </template>
      <span v-else class="placeholder">{{ props.placeholder }}</span>
    </div>
    <transition name="fade">
      <div v-show="open">
        <div v-show="props.displaySearch" class="v3ip__search">
          <input
            v-model="searchQuery"
            type="text"
            name="search"
            :placeholder="props.searchPlaceholder" />
        </div>
        <template v-if="filteredIcons && filteredIcons.length">
          <RecycleScroller
            ref="scroller"
            class="v3ip__items"
            :items="filteredIcons"
            :item-size="40"
            :grid-items="4"
            :item-secondary-size="width / 4">
            <template #default="{ item }">
              <div
                :key="item.name"
                :class="{ active: isIconSelected(item) }"
                @click="onSelected(item)">
                <ItemIcon
                  :data="item.svgCodeUrl"
                  :size="24"
                  :color="
                    isIconSelected(item) ? props.selectedIconColor : undefined
                  " />
              </div>
            </template>
          </RecycleScroller>
        </template>
        <div v-else class="v3ip__empty">
          <slot v-if="hasSlot('empty')" name="empty" />
          <div v-else class="default-text">
            <small>{{ props.emptyText }}</small>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .v3ip__custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 36px;
    line-height: 36px;
    min-width: 200px;
  }

  .v3ip__custom-select .v3ip__selected {
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid rgb(224, 224, 230);
    color: #333639;
    padding-left: 1em;
    padding-right: 1.4em;
    cursor: pointer;
    user-select: none;
    min-height: 36px;
    display: flex;
    align-items: center;
  }

  .v3ip__custom-select .v3ip__selected .multiple {
    align-items: center;
    display: flex;
  }

  .v3ip__custom-select .v3ip__selected .multiple .item {
    display: inline-block;
    margin-right: 10px;
  }

  .v3ip__custom-select .v3ip__selected .placeholder {
    color: silver;
  }

  .v3ip__custom-select .v3ip__selected.open {
    border: 1px solid #c2c2c2;
    border-radius: 6px 6px 0px 0px;
  }

  .v3ip__custom-select .v3ip__selected.open:after {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    top: 12px;
  }

  .v3ip__custom-select .v3ip__selected:after {
    position: absolute;
    content: '';
    top: 17px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #333639 transparent transparent transparent;
  }

  .v3ip__custom-select .v3ip__selected.disabled {
    cursor: default;
    background-color: whitesmoke;
  }

  .v3ip__custom-select .v3ip__items {
    color: #222;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid #c2c2c2;
    border-left: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
    position: absolute;
    background-color: #fff;
    left: 0;
    right: 0;
    z-index: 1;
    max-height: 225px;
    overflow-y: auto;
    display: flex;
  }

  .v3ip__custom-select .v3ip__items div {
    color: #222;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }

  .v3ip__custom-select .v3ip__items div:hover {
    background-color: rgb(243, 243, 245);
  }

  .v3ip__custom-select .v3ip__items div.active {
    background-color: v-bind(selectedIconBgColor);
  }

  .v3ip__search {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .v3ip__search input,
  .v3ip__search input:focus-visible {
    width: 100%;
    border-radius: 0;
    line-height: 30px;
    border: 1px solid #c2c2c2;
    border-top: none;
    padding-right: 1em;
    padding-left: 1em;
  }

  .v3ip__search input:focus-visible {
    border: 1px solid #858585;
    outline: 0;
  }

  .v3ip__empty {
    border-radius: 0px 0px 6px 6px;
    border-right: 1px solid #c2c2c2;
    border-left: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
    background-color: #fff;
    padding-bottom: 5px;
    padding-top: 5px;
    position: relative;
    z-index: 1;
  }

  .v3ip__empty > .default-text {
    text-align: center;
  }
</style>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
