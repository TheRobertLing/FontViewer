<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LoadedFont } from '@/types'
import GlyphPaginator from './GlyphPaginator.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

const props = defineProps<{
  loadedFont: LoadedFont | null
}>()

const page = ref<number>(1)
const GLYPHS_PER_PAGE = 100

const totalGlyphs = computed(() => props.loadedFont?.font.numGlyphs ?? 0)

const glyphs = computed(() => {
  if (!props.loadedFont) return []

  const start = (page.value - 1) * GLYPHS_PER_PAGE
  const end = Math.min(start + GLYPHS_PER_PAGE, props.loadedFont.font.numGlyphs)

  const head = props.loadedFont.font.tables.head!
  const unitsPerEm = props.loadedFont.font.unitsPerEm

  const fontHeight = head.yMax - head.yMin
  const fontWidth = head.xMax - head.xMin

  const boxSize = Math.max(fontHeight, fontWidth)
  const fontTopY = -head.yMax

  const verticalPadding = boxSize - fontHeight
  const viewBoxY = fontTopY - verticalPadding / 2

  return Array.from({ length: end - start }, (_, i) => {
    const id = start + i
    const glyph = props.loadedFont!.font.glyphs.get(id)

    const path = glyph.getPath(0, 0, unitsPerEm)
    const pathData = path.toPathData(2)
    const bbox = path.getBoundingBox()

    const glyphCenterX = (bbox.x1 + bbox.x2) / 2

    const viewBoxX = glyphCenterX - boxSize / 2

    const viewBox = `${viewBoxX} ${viewBoxY} ${boxSize} ${boxSize}`

    return {
      id,
      glyph,
      pathData,
      viewBox,
    }
  })
})

const copyGlyph = async (glyphItem: (typeof glyphs.value)[0]) => {
  try {
    const glyphChar =
      glyphItem.glyph.unicodes && glyphItem.glyph.unicodes.length > 0
        ? String.fromCodePoint(glyphItem.glyph.unicodes[0]!)
        : `Glyph ID: ${glyphItem.id}`

    await navigator.clipboard.writeText(glyphChar)

    toast.success('Glyph copied!', {
      description: `Copied: ${glyphChar}`,
    })
  } catch (error) {
    toast.error('Failed to copy glyph', {
      description: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
</script>

<template>
  <div class="size-full flex flex-col">
    <ScrollArea class="flex-1 overflow-y-auto p-2">
      <div class="grid grid-cols-[repeat(auto-fill,4rem)] gap-2 mx-auto max-w-3xl justify-center">
        <Button
          v-for="glyph in glyphs"
          :key="glyph.id"
          variant="outline"
          class="aspect-square h-auto has-[>svg]:px-2 py-2"
          @click="copyGlyph(glyph)"
        >
          <svg class="size-full" :viewBox="glyph.viewBox" fill="currentColor">
            <path :d="glyph.pathData" />
          </svg>
        </Button>
      </div>
    </ScrollArea>
    <div class="flex justify-center p-2">
      <GlyphPaginator v-model="page" :items-per-page="GLYPHS_PER_PAGE" :total="totalGlyphs" />
    </div>
  </div>
</template>
