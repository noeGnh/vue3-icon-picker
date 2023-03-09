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

	const color = computed(() => props.color)
	const width = computed(() =>
		typeof props.width == 'number' ? props.width + 'px' : 'unset'
	)
	const height = computed(() =>
		typeof props.height == 'number' ? props.height + 'px' : 'unset'
	)
</script>

<template>
	<i v-html="props.svg"></i>
</template>

<style scoped>
	::v-deep(svg) {
		display: block;
		color: v-bind(color);
		width: v-bind(width);
		height: v-bind(height);
	}
</style>
