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

	const styles = {
		color: props.color,
		width: props.width,
		height: props.height,
	}
</script>

<template>
	<i :style="styles" v-html="svg"></i>
</template>
