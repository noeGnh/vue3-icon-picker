export type IconLibrary =
	| 'antd'
	| 'carbon'
	| 'fa'
	| 'fluent'
	| 'ionicons4'
	| 'ionicons5'
	| 'material'
	| 'tabler'

export interface Icon {
	name: string | undefined
	svgCode: string
	library: string | undefined
}
