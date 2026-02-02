import type { Font } from 'opentype.js'

export interface LoadedFont {
  font: Font
  fileName: string
  fileSize: string
}
