import { createApp } from 'vue'

import App from './App.vue'

import Vue3IconPicker from 'vue3-icon-picker'

// WTF !!!
import(import.meta.env.DEV ? './style.css' : 'vue3-icon-picker/dist/style.css')

createApp(App).use(Vue3IconPicker).mount('#app')
