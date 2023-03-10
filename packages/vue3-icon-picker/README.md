# Vue 3 Icon Picker ![npm (scoped)](https://img.shields.io/npm/v/vue3-icon-picker)

Icon picker input component

<p align="center">
<img width="600" alt="Demo GIF" src="https://github.com/noeGnh/vue3-icon-picker/blob/master/demo.gif"/>
</p>

## Installation

```sh
npm i vue3-icon-picker
```

## About

This package use icons from [`xicons`](https://github.com/07akioni/xicons) with SVG components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons), [`ionicons`](https://github.com/ionic-team/ionicons), [`ant-design-icons`](https://github.com/ant-design/ant-design-icons), [`material-design-icons`](https://github.com/google/material-design-icons), [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome), [`tabler-icons`](https://github.com/tabler/tabler-icons) and [`carbon`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons). Check this website for view icons list: <https://www.xicons.org>.

## Demo

View the live demo [`here`](https://noegnh.github.io/vue3-icon-picker/)

## Usage

Add this package to your project main.js:

```js
import { createApp } from 'vue'

import App from './App.vue'

import Vue3IconPicker from 'vue3-icon-picker'
import 'vue3-icon-picker/dist/style.css'

createApp(App).use(Vue3IconPicker).mount('#app')
```

### In components

```html
<Vue3IconPicker v-model="icon" placeholder="Select icon" />
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
| includes               | string[]                                                                                        | Array of icon names to be included                                                       | []                | No       |
| excludes               | string[]                                                                                        | Array of icon names to be excluded                                                       | []                | No       |
| includeSearch          | string                                                                                          | The search query whose results must be included                                          | undefined         | No       |
| excludeSearch          | string                                                                                          | The search query whose results must be excluded                                          | undefined         | No       |
| emptyText              | string                                                                                          | Empty text                                                                               | 'Nothing to show' | No       |

## Slots

| Name  | Parameters | Description                            |
| ----- | ---------- | -------------------------------------- |
| empty | ()         | Empty slot for the dropdown icons list |

## Events

- change
  - This event is fired when selection change.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/noeGnh/vue3-icon-picker/releases).

## License

[MIT](https://github.com/noeGnh/vue3-icon-picker/blob/master/LICENSE)
