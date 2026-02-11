<script setup lang="ts">
import { useGlyphInspector } from '@/composables/glyph-inspector'
import { computed, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NumberField, NumberFieldContent, NumberFieldInput } from '@/components/ui/number-field'

const { glyphCount, getGlyphInfoAt } = useGlyphInspector()

const currentIndex = ref(0)

const currentGlyph = computed(() => {
  if (glyphCount.value === 0) return null
  return getGlyphInfoAt(currentIndex.value)
})

const formatUnicode = (unicode: number | null) => {
  if (unicode === null) return ''
  return `U+${unicode.toString(16).toUpperCase().padStart(4, '0')}`
}

const formatChar = (unicode: number | null) => {
  if (unicode === null) return ''
  try {
    return String.fromCodePoint(unicode)
  } catch {
    return ''
  }
}
</script>

<template>
  <div class="size-full overflow-y-auto space-y-4">
    <nav class="border-b sticky top-0 z-10 bg-background p-2 flex justify-center">
      <NumberField
        id="glyph-index"
        v-model="currentIndex"
        :min="0"
        :max="Math.max(glyphCount - 1, 0)"
        :format-options="{ useGrouping: false }"
        invert-wheel-change
        class="flex gap-2 items-center"
      >
        <Label for="glyph-index">Glyph</Label>
        <NumberFieldContent>
          <NumberFieldInput class="w-16" />
        </NumberFieldContent>
        <span class="text-sm text-muted-foreground">of {{ glyphCount }}</span>
      </NumberField>
    </nav>

    <article v-if="currentGlyph" class="max-w-lg mx-auto space-y-4 px-4 pb-4">
      <figure>
        <svg
          class="w-full aspect-square border rounded-lg bg-muted/30"
          :viewBox="currentGlyph.svg.viewBox"
          fill="currentColor"
          role="img"
          :aria-label="`Glyph ${currentGlyph.name}`"
        >
          <path :d="currentGlyph.svg.path" />
        </svg>
      </figure>

      <section aria-label="Glyph metadata">
        <div class="grid grid-cols-[1fr_2fr] items-center gap-x-4 gap-y-3">
          <Label for="meta-name" class="text-sm text-muted-foreground">Name</Label>
          <Input id="meta-name" :model-value="currentGlyph.name" readonly />

          <Label for="meta-index" class="text-sm text-muted-foreground">Index</Label>
          <Input id="meta-index" :model-value="String(currentGlyph.index)" readonly />

          <Label for="meta-unicode" class="text-sm text-muted-foreground">Unicode</Label>
          <Input
            id="meta-unicode"
            :model-value="formatUnicode(currentGlyph.unicode ?? null)"
            readonly
          />

          <Label for="meta-char" class="text-sm text-muted-foreground">Character</Label>
          <Input id="meta-char" :model-value="formatChar(currentGlyph.unicode ?? null)" readonly />

          <Label for="meta-width" class="text-sm text-muted-foreground">Advance Width</Label>
          <Input id="meta-width" :model-value="String(currentGlyph.advanceWidth)" readonly />
        </div>
      </section>
    </article>
  </div>
</template>
