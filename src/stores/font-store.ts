import type { Font } from 'opentype.js'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

type AppFont = Font

const useFontStore = defineStore('font-store', () => {
  const font = shallowRef<AppFont | null>(null)

  return { font }
})

export { type AppFont, useFontStore }
