<script setup lang="ts">
	import type { IconLibrary } from '../interface'

	export interface Props {
		placeholder?: string
		modelValue: string | string[]
		multiple?: boolean
		iconLibrary?: IconLibrary | 'all'
	}

	const props = withDefaults(defineProps<Props>(), {
		placeholder: undefined,
		multiple: false,
		iconLibrary: 'font-awesome',
	})

	const emits = defineEmits(['change', 'update:modelValue'])

	const open = ref<boolean>(false)
	const files = ref<{ [key: string]: any }>({})

	switch (props.iconLibrary) {
		case 'antd':
			files.value = import.meta.glob('../../node_modules/@sicons/antd/*.svg', {
				as: 'raw',
				eager: true,
			})
			break
		case 'carbon':
			files.value = import.meta.glob(
				'../../node_modules/@sicons/carbon/*.svg',
				{
					as: 'raw',
					eager: true,
				}
			)
			break
		case 'fluent':
			files.value = import.meta.glob(
				'../../node_modules/@sicons/fluent/*.svg',
				{
					as: 'raw',
					eager: true,
				}
			)
			break
		case 'ionicons4':
			files.value = import.meta.glob(
				'../../node_modules/@sicons/ionicons4/*.svg',
				{
					as: 'raw',
					eager: true,
				}
			)
			break
		case 'ionicons5':
			files.value = import.meta.glob(
				'../../node_modules/@sicons/ionicons5/*.svg',
				{
					as: 'raw',
					eager: true,
				}
			)
			break
		case 'material':
			files.value = import.meta.glob(
				'../../node_modules/@sicons/material/*.svg',
				{
					as: 'raw',
					eager: true,
				}
			)
			break
		case 'tabler':
			files.value = import.meta.glob(
				'../../node_modules/@sicons/tabler/*.svg',
				{
					as: 'raw',
					eager: true,
				}
			)
			break
		case 'font-awesome':
			files.value = import.meta.glob('../../node_modules/@sicons/fa/*.svg', {
				as: 'raw',
				eager: true,
			})
			break

		default:
			files.value = import.meta.glob('../../node_modules/@sicons/**/*.svg', {
				as: 'raw',
				eager: true,
			})
			break
	}

	const icons: string[] = []

	for (const [key] of Object.entries(files)) {
		icons.push(key)
	}
</script>

<template>
	<div class="v3ip__custom-select" @blur="open = false">
		<div
			class="v3ip__selected"
			:class="{ v3ip__open: open }"
			@click="open = !open">
			<template v-if="props.modelValue"> </template>
			<span v-else class="placeholder">{{ props.placeholder }}</span>
		</div>
		<div class="v3ip__items" :class="{ 'v3ip__select-hide': !open }">
			<template v-for="(icon, i) in icons" :key="i">
				<Icon :svg="files[icon]" :width="50" />
			</template>
		</div>
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
	}

	.v3ip__custom-select .v3ip__selected {
		background-color: #fff;
		border-radius: 6px;
		border: 1px solid rgb(224, 224, 230);
		color: #333639;
		padding-left: 1em;
		cursor: pointer;
		user-select: none;
		min-height: 36px;
	}

	.v3ip__custom-select .v3ip__selected .placeholder {
		color: silver;
	}

	.v3ip__custom-select .v3ip__selected.v3ip__open {
		border: 1px solid #c2c2c2;
		border-radius: 6px 6px 0px 0px;
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
	}

	.v3ip__custom-select .v3ip__items div {
		color: #222;
		padding-left: 1em;
		cursor: pointer;
		user-select: none;
	}

	.v3ip__custom-select .v3ip__items div:hover {
		background-color: rgb(243, 243, 245);
	}

	.v3ip__select-hide {
		display: none;
	}
</style>
