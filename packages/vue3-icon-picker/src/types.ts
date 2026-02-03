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

export type InputSize = 'small' | 'medium' | 'large'

export type Theme = 'dark' | 'light'

export interface Icon {
  id: number
  name: string
  svgUrl: string
  library: string
}

export interface Options {
  name: string
}
