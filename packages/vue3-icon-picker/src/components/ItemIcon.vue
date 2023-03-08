<script setup lang="ts">
	export interface Props {
		svg: string
		color?: string
		width?: string | number
		height?: string | number
	}

	const props = withDefaults(defineProps<Props>(), {
		color: undefined,
		width: undefined,
		height: undefined,
	})

	const width = typeof props.width == 'number' ? props.width + 'px' : 'unset'
	const height = typeof props.height == 'number' ? props.height + 'px' : 'unset'
</script>

<template>
	<i v-html="props.svg"></i>
</template>

<style scoped>
	::v-deep(svg) {
		display: block;
		width: v-bind(width);
		height: v-bind(height);
	}
</style>
