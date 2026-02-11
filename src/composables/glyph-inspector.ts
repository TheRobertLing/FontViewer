import type { Glyph } from 'opentype.js'
import { useFontStore } from '@/stores/font-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

interface SvgPathData {
  path: string
  viewBox: string
}

interface GlyphInfo {
  index: number
  name: string
  unicode?: number
  advanceWidth: number
  svg: SvgPathData
}

interface FontBoundingBox {
  boxSize: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

function getGlyphSvgPathData(
  glyph: Glyph,
  unitsPerEm: number,
  fontBBox: FontBoundingBox | null,
): SvgPathData {
  const path = glyph.getPath(0, 0, unitsPerEm)
  const pathData = path.toPathData(2)
  const pathBBox = path.getBoundingBox()

  const bbox = fontBBox ?? {
    boxSize: Math.max(pathBBox.x2 - pathBBox.x1, pathBBox.y2 - pathBBox.y1),
    xMin: pathBBox.x1,
    xMax: pathBBox.x2,
    yMin: pathBBox.y1,
    yMax: pathBBox.y2,
  }

  /**
   * Opentype.js automatically flips pathData so when rendered as an svg the font item is upright
   *
   * e.g if an arrow stretches from (0,0) to (0,10) in the font coordinate system (y points upwards)
   * opentype.js returns data that when rendered in the font coordinate system points from (0,0) to
   * (0, -10) (flipped about x axis). Because positive y points downards for SVG's, this would cause
   * the arrow to look like it was pointing upwards when rendered in an svg coordinate system. SO
   * then to actually get the correct svg viewbox, the font bbox itself needs to be flipped as well
   */

  const fontHeight = bbox.yMax - bbox.yMin
  const fontTopY = -bbox.yMax
  const viewBoxY = fontTopY - (bbox.boxSize - fontHeight) / 2

  const glyphCenterX = (pathBBox.x1 + pathBBox.x2) / 2
  const viewBoxX = glyphCenterX - bbox.boxSize / 2

  return {
    path: pathData,
    viewBox: `${viewBoxX} ${viewBoxY} ${bbox.boxSize} ${bbox.boxSize}`,
  }
}

function useGlyphInspector() {
  const { font } = storeToRefs(useFontStore())

  const glyphCount = computed(() => font.value?.numGlyphs ?? 0)

  const fontBoundingBox = computed<FontBoundingBox | null>(() => {
    if (!font.value) return null

    const head = font.value.tables.head!
    const fontWidth = head.xMax - head.xMin
    const fontHeight = head.yMax - head.yMin
    const boxSize = Math.max(fontWidth, fontHeight)

    return { boxSize, xMin: head.xMin, xMax: head.xMax, yMin: head.yMin, yMax: head.yMax }
  })

  const getGlyphSvgAt = (index: number): SvgPathData => {
    if (!font.value) throw new Error('No font is currently loaded')
    if (index < 0 || index >= glyphCount.value) throw new Error(`Glyph index ${index} out of bounds`)

    const glyph = font.value.glyphs.get(index)
    return getGlyphSvgPathData(glyph, font.value.unitsPerEm, fontBoundingBox.value)
  }

  const getGlyphInfoAt = (index: number): GlyphInfo => {
    if (!font.value) throw new Error('No font is currently loaded')
    if (index < 0 || index >= glyphCount.value) throw new Error(`Glyph index ${index} out of bounds`)

    const glyph = font.value.glyphs.get(index)
    const svg = getGlyphSvgPathData(glyph, font.value.unitsPerEm, fontBoundingBox.value)

    return {
      index,
      name: glyph.name || '',
      unicode: glyph.unicode ?? null,
      advanceWidth: glyph.advanceWidth ?? 0,
      svg,
    }
  }

  return { glyphCount, getGlyphSvgAt, getGlyphInfoAt }
}

export { type SvgPathData, type GlyphInfo, useGlyphInspector }
