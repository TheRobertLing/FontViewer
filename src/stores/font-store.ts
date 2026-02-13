import type { Font, Glyph } from 'opentype.js'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { parse as parseFontFile } from 'opentype.js'
import decompress from 'woff2-encoder/decompress'

interface GlyphSvgData {
  path: string
  viewBox: string
}

interface GlyphData {
  index: number
  name: string
  unicode: number | undefined
  unicodes: number[]
  character: string | null
  advanceWidth: number
  leftSideBearing: number
  numberOfContours: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  svg: GlyphSvgData
}

function computeGlyphSvg(glyph: Glyph, font: Font): GlyphSvgData {
  const unitsPerEm = font.unitsPerEm
  const path = glyph.getPath(0, 0, unitsPerEm)
  const pathData = path.toPathData(2)
  const pathBBox = path.getBoundingBox()

  const head = font.tables.head!
  const fontWidth = head.xMax - head.xMin
  const fontHeight = head.yMax - head.yMin
  const boxSize = Math.max(fontWidth, fontHeight)

  const fontTopY = -head.yMax
  const viewBoxY = fontTopY - (boxSize - fontHeight) / 2

  const glyphCenterX = (pathBBox.x1 + pathBBox.x2) / 2
  const viewBoxX = glyphCenterX - boxSize / 2

  return {
    path: pathData,
    viewBox: `${viewBoxX} ${viewBoxY} ${boxSize} ${boxSize}`,
  }
}

interface FontFileData {
  font: Font
  fileData: {
    name: string
    fileSize: number
  }
}

class UnsupportedFontFormatError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnsupportedFontFormatError'
  }
}

class FontParsingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FontParsingError'
  }
}

const ACCEPTED_FILE_TYPES = ['.ttf', '.otf', '.woff', '.woff2'] as const

function isValidFileType(file: File) {
  const name = file.name.toLowerCase()

  if (!ACCEPTED_FILE_TYPES.some((type) => name.endsWith(type))) {
    return false
  }

  return true
}

async function convertFontFileToBuffer(file: File) {
  const buffer = await file.arrayBuffer()

  if (file.name.endsWith('woff2')) {
    return await decompress(buffer)
  }

  return buffer
}

const useFontFileDataStore = defineStore('font-store', () => {
  const fontFileData = shallowRef<FontFileData | null>(null)
  const isLoading = ref(false)

  const loadFontFile = async (file: File) => {
    if (!isValidFileType(file)) {
      throw new UnsupportedFontFormatError(
        `File format not supported. Accepted formats: ${ACCEPTED_FILE_TYPES.join(', ')}`,
      )
    }

    try {
      isLoading.value = true
      const buffer = await convertFontFileToBuffer(file)
      const parsed = parseFontFile(buffer)

      fontFileData.value = {
        font: parsed,
        fileData: {
          name: file.name,
          fileSize: file.size,
        },
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : ''
      throw new FontParsingError('Error passing font file: ' + msg)
    } finally {
      isLoading.value = false
    }
  }

  // Keep all of the state in here for now
  const currentGlyph = ref(1)

  const numGlyphs = computed(() => {
    if (!fontFileData.value) {
      return 0
    }

    return fontFileData.value.font.numGlyphs
  })

  const currentGlyphData = computed<GlyphData | null>(() => {
    if (!fontFileData.value) return null

    const font = fontFileData.value.font
    const index = currentGlyph.value - 1 // paginator is 1-based, glyphs are 0-based
    if (index < 0 || index >= font.numGlyphs) return null

    const glyph = font.glyphs.get(index)
    const metrics = glyph.getMetrics()
    const svg = computeGlyphSvg(glyph, font)

    return {
      index,
      name: glyph.name || '',
      unicode: glyph.unicode,
      unicodes: glyph.unicodes,
      character: glyph.unicode ? String.fromCodePoint(glyph.unicode) : null,
      advanceWidth: glyph.advanceWidth ?? 0,
      leftSideBearing: glyph.leftSideBearing ?? 0,
      numberOfContours: glyph.numberOfContours ?? 0,
      xMin: metrics.xMin,
      xMax: metrics.xMax,
      yMin: metrics.yMin,
      yMax: metrics.yMax,
      svg,
    }
  })

  return { fontFileData, isLoading, currentGlyph, numGlyphs, currentGlyphData, loadFontFile }
})

export { type FontFileData, ACCEPTED_FILE_TYPES, useFontFileDataStore }
