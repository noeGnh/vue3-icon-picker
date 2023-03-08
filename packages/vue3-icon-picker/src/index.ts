import type { App } from 'vue'

import Vue3IconPicker from './components/Picker.vue'

export { Vue3IconPicker }

const plugin = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	install(app: App, options?: any) {
		app.component('Vue3IconPicker', Vue3IconPicker)
	},
}

export default plugin
