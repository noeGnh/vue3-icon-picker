import type { App } from 'vue'

import ItemIcon from './components/ItemIcon.vue'
import Vue3IconPicker from './components/Picker.vue'
import SelectedIcon from './components/SelectedIcon.vue'
import type { Options } from './types'

export { Vue3IconPicker, ItemIcon as Icon, SelectedIcon }

const plugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app: App, options?: Options) {
    app.component(options?.name || 'Vue3IconPicker', Vue3IconPicker)
  },
}

export default plugin
