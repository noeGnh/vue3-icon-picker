export type IconLibrary =
  | 'antd'
  | 'carbon'
  | 'fa'
  | 'fluent'
  | 'ionicons4'
  | 'ionicons5'
  | 'material'
  | 'tabler'

export type ValueType = 'name' | 'svg'

export interface Icon {
  id: number
  name: string
  svgCode: string
  library: string
}

export interface Options {
  name: string
}
