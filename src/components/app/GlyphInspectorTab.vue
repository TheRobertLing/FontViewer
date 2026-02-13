<script setup lang="ts">
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import GlyphPaginator from './GlyphPaginator.vue'
import GlyphSvgPreview from './GlyphSvgPreview.vue'
import GlyphMetadata from './GlyphMetadata.vue'
import { useFontFileDataStore } from '@/stores/font-store'

const font = useFontFileDataStore()
</script>

<template>
  <Card class="gap-4 py-4">
    <CardContent class="flex-1 px-4 overflow-y-auto">
      <template v-if="font.currentGlyphData">
        <div class="flex justify-center py-4">
          <div class="w-full max-w-md aspect-square border rounded-md flex items-center justify-center p-4">
            <GlyphSvgPreview
              :path="font.currentGlyphData.svg.path"
              :view-box="font.currentGlyphData.svg.viewBox"
              class="w-full h-full"
            />
          </div>
        </div>
        <Separator />
        <GlyphMetadata v-bind="font.currentGlyphData" />
      </template>
      <div v-else class="flex items-center justify-center h-full text-muted-foreground">
        No font loaded
      </div>
    </CardContent>
    <CardFooter class="border-t px-4 [.border-t]:pt-4">
      <GlyphPaginator />
    </CardFooter>
  </Card>
</template>
