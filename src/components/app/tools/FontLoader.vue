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
import AppTabLayout from '../layout/AppTabLayout.vue'

const dropZoneEl = useTemplateRef('dropZoneEl')

const { openFileDialog, isOverDropZone, fontFileInfo, formattedFileSize } =
  useFontFileLoaders(dropZoneEl)
</script>

<template>
  <AppTabLayout>
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
      class="border flex-1 rounded-lg border-dashed cursor-pointer transition-colors"
      :class="
        isOverDropZone
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50'
      "
      @click="openFileDialog()"
    >
      <Empty class="size-full border-0">
        <EmptyContent>
          <EmptyMedia variant="icon">
            <Upload />
          </EmptyMedia>
          <EmptyTitle>Drop Font File Here</EmptyTitle>
          <EmptyDescription>or click to browse (.ttf, .otf, .woff)</EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  </AppTabLayout>
</template>
