import type { App } from 'vue'

import Icon from './components/Icon.vue'
import Vue3IconPicker from './components/Picker.vue'
import type { Options } from './types'

export { Vue3IconPicker, Icon }

const plugin = {
  install(app: App, options?: Options) {
    app.component(options?.name || 'Vue3IconPicker', Vue3IconPicker)
  },
}

export default plugin
