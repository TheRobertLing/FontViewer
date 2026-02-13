<script setup lang="ts">
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { useFontFileDataStore } from '@/stores/font-store'
import { Spinner } from '@/components/ui/spinner'

const font = useFontFileDataStore()

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <Item variant="outline" class="w-full">
    <ItemContent>
      <ItemTitle class="line-clamp-1">
        {{ font.fontFileData === null ? 'No Font File Loaded' : font.fontFileData.fileData.name }}
      </ItemTitle>
      <ItemDescription class="line-clamp-1">
        {{
          font.fontFileData === null
            ? 'Accepted File Formats: .ttf, .otf, .woff, .woff2'
            : `File Size: ${formatFileSize(font.fontFileData.fileData.fileSize)}`
        }}
      </ItemDescription>
    </ItemContent>
    <ItemContent>
      <Spinner v-if="font.isLoading" />
    </ItemContent>
  </Item>
</template>
