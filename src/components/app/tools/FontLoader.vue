<script setup lang="ts">
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { useFontFileLoaders } from '@/composables/font-file-loaders'
import { useTemplateRef } from 'vue'
import { Upload } from 'lucide-vue-next'

const dropZoneEl = useTemplateRef('dropZoneEl')

const { openFileDialog, isOverDropZone, fontFileInfo, formattedFileSize } =
  useFontFileLoaders(dropZoneEl)
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 size-full">
    <Item variant="outline">
      <ItemContent>
        <ItemTitle class="line-clamp-1">
          {{ fontFileInfo ? 'Loaded File: ' + fontFileInfo.name : 'No Font Loaded' }}</ItemTitle
        >
        <ItemDescription class="line-clamp-1">
          {{ fontFileInfo ? `Size: ${formattedFileSize}` : 'Load a font file to access tools' }}
        </ItemDescription>
      </ItemContent>
    </Item>
    <div
      ref="dropZoneEl"
      class="border flex-1 rounded-lg border-input border-dashed cursor-pointer transition-colors hover:bg-card"
      :class="{ 'bg-card border-primary': isOverDropZone }"
      @click="openFileDialog()"
    >
      <Empty class="size-full">
        <EmptyContent>
          <EmptyMedia variant="icon">
            <Upload />
          </EmptyMedia>
          <EmptyTitle>Drop Font File Here</EmptyTitle>
          <EmptyDescription>or click to browse (.ttf, .otf, .woff)</EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  </div>
</template>
