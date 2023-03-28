import type { App } from 'vue'

import Icon from './components/Icon.vue'
import Vue3IconPicker from './components/Picker.vue'
import type { Options } from './interface'

export { Vue3IconPicker, Icon }

const plugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app: App, options?: Options) {
    app.component(options?.name || 'Vue3IconPicker', Vue3IconPicker)
  },
}

export default plugin
