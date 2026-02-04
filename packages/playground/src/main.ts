import { createApp } from 'vue'
import Vue3IconPicker from 'vue3-icon-picker'

import App from './App.vue'

if (import.meta.env.PROD) {
  import('../../vue3-icon-picker/dist/style.css')
}

createApp(App).use(Vue3IconPicker).mount('#app')
