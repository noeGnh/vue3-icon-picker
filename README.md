# Vue 3 Icon Picker ![npm (scoped)](https://img.shields.io/npm/v/vue3-icon-picker)

Icon picker component

<p align="center">
<img width="600" alt="Demo GIF" src="https://github.com/noeGnh/vue3-icon-picker/blob/master/demo.gif"/>
</p>

## Installation

If you are using npm:

```sh
npm i vue3-icon-picker
```

If you are using yarn:

```sh
yarn add vue3-icon-picker
```

## About

This package use icons from [`xicons`](https://github.com/07akioni/xicons) with SVG components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons), [`ionicons`](https://github.com/ionic-team/ionicons), [`ant-design-icons`](https://github.com/ant-design/ant-design-icons), [`material-design-icons`](https://github.com/google/material-design-icons), [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome), [`tabler-icons`](https://github.com/tabler/tabler-icons) and [`carbon`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons). Check this website for view icons list: [https://www.xicons.org](https://www.xicons.org).

## Demo

View the live demo [`here`](https://noegnh.github.io/vue3-icon-picker/)

## Usage

You can add this package globally to your project:

```js
// main.js
import { createApp } from 'vue'

import App from './App.vue'

import Vue3IconPicker from 'vue3-icon-picker'
import 'vue3-icon-picker/dist/style.css'

createApp(App).use(Vue3IconPicker).mount('#app')
```

If needed rename component to use:

```js
createApp(App).use(Vue3IconPicker, { name: 'IconPicker' }).mount('#app') // use in template <IconPicker />
```

Alternatively you can also import the component locally:

```js
<script setup>
 import { Vue3IconPicker } from 'vue3-icon-picker'
 import 'vue3-icon-picker/dist/style.css'
</script>
```

You can then use the component in your template

```html
<template>
 <Vue3IconPicker v-model="icon" placeholder="Select icon" />
</template>
```

## Props

| Name                   | Type                                                                                            | Description                                                                              | Default           | Required |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------- | -------- |
| v-model                | string / string[]                                                                               | Selection, icon(s) SVG code(s) or name(s)                                                | null              | Yes      |
| placeholder            | string                                                                                          | Input placeholder                                                                        | undefined         | No       |
| multiple               | boolean                                                                                         | Enable multiple selection when set to true                                               | false             | No       |
| multipleLimit          | number                                                                                          | Maximum number of selections when multiple selection is enabled                          | Infinity          | No       |
| selectedItemsToDisplay | number                                                                                          | Number of selected icons to display when multiple selection is enabled                   | 9                 | No       |
| iconLibrary            | 'all' / 'antd' / 'carbon' / 'fa' / 'fluent' / 'ionicons4' / 'ionicons5' / 'material' / 'tabler' | Icon library to display. This property can take an array of several libraries to display | 'fa'              | No       |
| selectedIconBgColor    | string                                                                                          | Selected icon(s) background color                                                        | '#d3d3d3'         | No       |
| selectedIconColor      | string                                                                                          | Selected icon(s) color                                                                   | '#000000'         | No       |
| clearable              | boolean                                                                                         | Make selected icon clearable when multiple is false                                      | false             | No       |
| disabled               | boolean                                                                                         | Disable component                                                                        | false             | No       |
| displaySearch          | boolean                                                                                         | Display search input                                                                     | true              | No       |
| searchPlaceholder      | string                                                                                          | Search input placeholder                                                                 | 'Search'          | No       |
| valueType              | 'svg' / 'name'                                                                                  | Type of selection value, icon(s) SVG code(s) or name(s)                                  | 'svg'             | No       |
| includeIcons           | string[]                                                                                        | List of icons to include                                                                 | []                | No       |
| excludeIcons           | string[]                                                                                        | List of icons to exclude                                                                 | []                | No       |
| includeSearch          | string                                                                                          | The search query whose results must be included                                          | undefined         | No       |
| excludeSearch          | string                                                                                          | The search query whose results must be excluded                                          | undefined         | No       |
| emptyText              | string                                                                                          | Empty text                                                                               | 'Nothing to show' | No       |
| inputSize              | 'small' / 'medium' / 'large'                                                                    | Size of input                                                                            | 'medium'          | No       |
| theme                  | 'dark' / 'light'                                                                                | Picker theme                                                                             | 'light'           | No       |

## Slots

| Name  | Parameters | Description                            |
| ----- | ---------- | -------------------------------------- |
| empty | ()         | Empty slot for the dropdown icons list |

## Events

- change
  - This event is fired when selection change.

## Display icons

You can simply display icons like that if your value type is svg:

```html
<script setup>
 const icon = ref(null)
</script>

<template>
 <Vue3IconPicker v-model="icon" placeholder="Select icon" />
 <i v-html="icon"></i>
</template>
```

Or use custom icon component provided by this package:

```html
<script setup>
 import { Icon } from 'vue3-icon-picker'
 const icon = ref(null)
</script>

<template>
 <Vue3IconPicker v-model="icon" placeholder="Select icon" />
 <Icon :data="icon" :size="24" color="#124ebb"></Icon>
</template>
```

### Icon Props

| Name  | Type            | Description           | Default   | Required |
| ----- | --------------- | --------------------- | --------- | -------- |
| data  | string          | Icon svg code or name | undefined | Yes      |
| size  | number / string | Icon size             | 24        | No       |
| color | string          | Icon color            | undefined | No       |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/noeGnh/vue3-icon-picker/blob/master/packages/vue3-icon-picker/CHANGELOG.md).

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/noeGnh/vue3-icon-picker/blob/master/LICENSE)
