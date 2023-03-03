/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
	plugins: [
		vue(),
		Components({
			dts: true,
			extensions: ['vue', 'md'],
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			resolvers: [],
			dirs: ['src/components'],
		}),
		AutoImport({
			// targets to transform
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/, // .md
			],
			// global imports to register
			imports: [
				// presets
				'vue',
			],

			// Auto import for module exports under directories
			// by default it only scan one level of modules under the directory
			dirs: [],

			// Auto import inside Vue template
			// see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
			vueTemplate: true,

			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
		}),
	],
	build: {
		lib: {
			name: 'Vue3IconPicker',
			entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
			formats: ['es', 'cjs', 'iife'],
			fileName: (format) => {
				switch (format) {
					case 'es':
						return 'index.mjs'
					case 'cjs':
						return 'index.cjs'
					case 'iife':
						return 'index.js'
					default:
						return 'index.js'
				}
			},
		},
		minify: false,
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	test: {
		environment: 'jsdom',
	},
})
