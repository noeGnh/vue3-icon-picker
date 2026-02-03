<script setup lang="ts">
  const selection = ref(null)
  const darkMode = ref<boolean>(false)
  const multipleSelection = ref<boolean>(false)
  const selectedLibraries = ref<string[]>(['fa'])
  const inputSize = ref<'small' | 'medium' | 'large'>('medium')

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

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }
</script>

<template>
  <section class="container">
    <h2>D E M O</h2>
    <h4>Icon libraries to display</h4>
    <div class="buttons">
      <div
        v-for="(lib, i) in iconLibraries"
        :key="i"
        class="button"
        :class="{ selected: isSelected(lib) }"
        @click="toggleSelectedLibraries(lib)">
        {{ lib }}
      </div>
    </div>
    <h4>Input sizes</h4>
    <div class="buttons">
      <div
        class="button"
        :class="{ selected: inputSize == 'small' }"
        @click="inputSize = 'small'">
        Small
      </div>
      <div
        class="button"
        :class="{ selected: inputSize == 'medium' }"
        @click="inputSize = 'medium'">
        Medium
      </div>
      <div
        class="button"
        :class="{ selected: inputSize == 'large' }"
        @click="inputSize = 'large'">
        Large
      </div>
    </div>
    <h4>Other options</h4>
    <div class="buttons">
      <div
        class="button"
        :class="{ selected: multipleSelection }"
        @click="toggleMultipleSelection()">
        Multiple selection
      </div>
      <div
        class="button"
        :class="{ selected: darkMode }"
        @click="toggleDarkMode()">
        Dark mode
      </div>
    </div>
    <hr />
    <Vue3IconPicker
      v-model="selection"
      value-type="svg"
      :icon-library="selectedLibraries"
      :multiple="multipleSelection"
      :clearable="!multipleSelection"
      selected-icon-bg-color="#6495ED"
      selected-icon-color="white"
      placeholder="Select icon(s)"
      style="width: 350px; margin-top: 15px"
      :input-size="inputSize"
      :theme="darkMode ? 'dark' : 'light'" />
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

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 15px;
  }

  .button {
    border: 1px solid #ccc;
    padding: 5px 15px;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;
  }

  .selected {
    border: 1px solid #6495ed;
    background-color: #6495ed;
    color: white;
  }
</style>
