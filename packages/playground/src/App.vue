<script setup lang="ts">
	const selection = ref(null)
	const multipleSelection = ref<boolean>(false)
	const selectedLibraries = ref<string[]>(['fa'])

	const iconLibraries = [
		'antd',
		'carbon',
		'fa',
		'fluent',
		'ionicons4',
		'ionicons5',
		'material',
		'tabler',
	]

	const isSelected = (lib: string) => {
		return selectedLibraries.value.find((l: string) => l == lib)
	}

	const toggleSelectedLibraries = (lib: string) => {
		const index = selectedLibraries.value.findIndex((l: string) => l == lib)

		if (index > -1) {
			selectedLibraries.value.splice(index, 1)
		} else {
			selectedLibraries.value.push(lib)
		}
	}

	const toggleMultipleSelection = () => {
		selection.value = null
		multipleSelection.value = !multipleSelection.value
	}
</script>

<template>
	<section class="container">
		<h2>D E M O</h2>
		<h4>Icon libraries to display</h4>
		<div class="libraries">
			<div
				v-for="(lib, i) in iconLibraries"
				:key="i"
				class="library"
				:class="{ selected: isSelected(lib) }"
				@click="toggleSelectedLibraries(lib)">
				{{ lib }}
			</div>
		</div>
		<div>
			<div
				class="library"
				:class="{ selected: multipleSelection }"
				@click="toggleMultipleSelection()">
				Multiple selection
			</div>
		</div>
		<Vue3IconPicker
			v-model="selection"
			value-type="svg"
			:icon-library="selectedLibraries"
			:multiple="multipleSelection"
			:clearable="!multipleSelection"
			selected-icon-bg-color="indigo"
			selected-icon-color="white"
			placeholder="Select icon(s)"
			style="width: 350px; margin-top: 15px" />
	</section>
</template>

<style>
	html,
	body {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding-top: 15px;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.libraries {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 20px;
	}

	.library {
		border: 1px solid #ccc;
		padding: 5px 15px;
		cursor: pointer;
		margin-right: 10px;
		margin-left: 10px;
	}

	.selected {
		background-color: indigo;
		color: white;
	}
</style>
