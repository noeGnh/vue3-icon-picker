<script setup lang="ts">
	import iconsRawList from '../assets/icons.json'
	import type { IconLibrary, Icon } from '../interface'
	import { useDetectOutsideClick } from '../utils'

	import ItemIcon from './ItemIcon.vue'

	export interface Props {
		searchPlaceholder?: string
		placeholder?: string
		modelValue: string | string[] | null
		multiple?: boolean
		iconLibrary?: IconLibrary | 'all' | IconLibrary[]
		activeColor?: string
		displaySearch?: boolean
		limit?: number
		disabled?: boolean
		selectedItemsToDisplay?: number
		clearable?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		searchPlaceholder: 'Search',
		placeholder: undefined,
		multiple: false,
		iconLibrary: 'fa',
		activeColor: '#d3d3d3',
		displaySearch: true,
		limit: Infinity,
		disabled: false,
		selectedItemsToDisplay: 9,
		clearable: false,
	})

	const emits = defineEmits(['change', 'update:modelValue'])

	const activeColor = ref(props.activeColor)
	const searchQuery = ref<string>('')
	const open = ref<boolean>(false)
	const iconsList: Icon[] = []

	const extractIconData = (key: string) => {
		const parts = key.split('__')

		return [parts[0], parts.length > 1 ? parts[1] : undefined]
	}

	for (const [key, value] of Object.entries(iconsRawList)) {
		const [name, library] = extractIconData(key)
		iconsList.push({
			name: name,
			svgCode: value,
			library: library,
		})
	}

	const filteredIcons = computed(() => {
		return iconsList.filter(
			(icon) =>
				((typeof props.iconLibrary === 'string' &&
					icon.library == props.iconLibrary) ||
					(Array.isArray(props.iconLibrary) &&
						props.iconLibrary.includes(icon.library as IconLibrary)) ||
					props.iconLibrary == 'all') &&
				(!searchQuery.value ||
					icon.name?.toLocaleLowerCase().includes(searchQuery.value))
		)
	})

	const isIconSelected = (icon: Icon) => {
		if (props.multiple) {
			if (props.modelValue && props.modelValue.length)
				return (
					(props.modelValue as string[]).findIndex(
						(i: string) => i == icon.svgCode
					) > -1
				)
			return false
		} else return props.modelValue == icon.svgCode
	}

	const onSelected = (icon: Icon | undefined) => {
		if (icon) {
			if (props.multiple) {
				if (props.modelValue && props.modelValue.length) {
					const tempArray = props.modelValue as string[]

					const index = (props.modelValue as string[]).findIndex(
						(i: string) => i == icon.svgCode
					)
					if (index > -1) {
						tempArray.splice(index, 1)
					} else {
						if (props.modelValue.length < props.limit) {
							tempArray.push(icon.svgCode)
						}
					}
					emits('update:modelValue', tempArray)
					emits('change', tempArray, icon)
				} else {
					if (props.limit > 0) {
						emits('update:modelValue', [icon.svgCode])
						emits('change', [icon.svgCode], icon)
					}
				}
			} else {
				if (icon.svgCode == props.modelValue) {
					if (props.clearable) emits('update:modelValue', null)
				} else {
					emits('update:modelValue', icon.svgCode)
				}
				emits('change', icon)
			}
		}
	}

	const pickerRef = ref()

	useDetectOutsideClick(pickerRef, () => {
		open.value = false
	})
</script>

<template>
	<div ref="pickerRef" class="v3ip__custom-select" @blur="open = false">
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
							v-for="(svgCode, i) in (props.modelValue as string[] || [])"
							:key="i">
							<item-icon
								v-if="i < props.selectedItemsToDisplay"
								class="item"
								:svg="svgCode"
								:height="20"
								@click.stop="
									onSelected(
										filteredIcons?.find((icon) => icon.svgCode == svgCode)
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
				<item-icon
					v-else
					:svg="(props.modelValue as string)"
					:height="20"
					@click.stop="
						onSelected(
							filteredIcons?.find((icon) => icon.svgCode == props.modelValue)
						)
					" />
			</template>
			<span v-else class="placeholder">{{ props.placeholder }}</span>
		</div>
		<transition name="slide" mode="out-in">
			<div v-show="open && props.displaySearch" class="v3ip__search">
				<input
					v-model="searchQuery"
					type="text"
					name="search"
					:placeholder="props.searchPlaceholder" />
			</div>
		</transition>
		<transition name="slide" mode="out-in">
			<div v-show="open" class="v3ip__items">
				<div
					v-for="(icon, i) in filteredIcons"
					:key="i"
					:class="{ active: isIconSelected(icon) }"
					@click="onSelected(icon)">
					<item-icon :svg="icon.svgCode" :height="24" />
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
		display: grid;
		grid-template-columns: 2fr 2fr 2fr 2fr;
		grid-column-gap: 5px;
		grid-row-gap: 5px;
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
		background-color: v-bind(activeColor);
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
		border-top: none;
		border-radius: 0;
		line-height: 30px;
		border: 1px solid #c2c2c2;
		padding-right: 1em;
		padding-left: 1em;
	}

	.v3ip__search input:focus-visible {
		border: 1px solid #858585;
		outline: 0;
	}
</style>

<style scoped>
	.slide-enter-active {
		-moz-transition-duration: 0.3s;
		-webkit-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-moz-transition-timing-function: ease-in;
		-webkit-transition-timing-function: ease-in;
		-o-transition-timing-function: ease-in;
		transition-timing-function: ease-in;
	}

	.slide-leave-active {
		-moz-transition-duration: 0.3s;
		-webkit-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
		-webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
		-o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}

	.slide-enter-to,
	.slide-leave {
		max-height: 100px;
		overflow: hidden;
	}

	.slide-enter,
	.slide-leave-to {
		overflow: hidden;
		max-height: 0;
	}
</style>
