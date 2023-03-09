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

| Name             | Type                                                 | Description                    | Default   | Required |
| ---------------- | ---------------------------------------------------- | ------------------------------ | --------- | -------- |
| v-model              | string / string[]                                               | Selection                   | null | Yes      |
| placeholder              | string                                               | Input placeholder          | undefined | No       |
| multiple      | boolean                                               | Enable multiple selection when set to true          | false | No       |
| limit           | number                                      | Maximum number of selections when multiple selection is enabled                   | Infinity | No       |
| selectedItemsToDisplay            | number                                      | Number of selected icons to display when multiple selection is enabled                    | 9 | No       |
| iconLibrary           | 'antd' / 'carbon' / 'fa' / 'fluent' / 'ionicons4' / 'ionicons5' / 'material' / 'tabler'                                               | Icon library to display. This property can take an array of several libraries to display but it is not recommended because it could cause performance issues                     | 'fa'        | No       |
| activeColor        | string | Selected icon(s) highlight color           | '#d3d3d3'    | No       |
| clearable | boolean                     | Make selected icon clearable when multiple is false | false | No       |
| disabled | boolean                     | Disable component | false | No       |
| displaySearch | boolean                     | Display search input | true | No       |
| searchPlaceholder | string                     | Search input placeholder | 'Search' | No       |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/noeGnh/vue3-icon-picker/releases).

## License

[MIT](https://github.com/noeGnh/vue3-icon-picker/blob/master/LICENSE)
