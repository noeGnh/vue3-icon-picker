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
	id: number
	name: string | undefined
	svgCode: string
	library: string | undefined
}
