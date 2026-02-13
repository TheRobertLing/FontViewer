<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Upload } from 'lucide-vue-next'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { ACCEPTED_FILE_TYPES, useFontFileDataStore } from '@/stores/font-store'

const font = useFontFileDataStore()

const dropZoneEl = useTemplateRef('dropZoneEl')

const { open, onChange } = useFileDialog({
  accept: ACCEPTED_FILE_TYPES.join(),
  multiple: false,
})

onChange(async (fileList) => {
  if (!fileList?.length) return

  try {
    const file = fileList[0]!
    await font.loadFontFile(file)
    toast.success('Font loaded successfully')
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred'
    toast({ msg: errorMessage, type: 'error' })
  }
})

const { isOverDropZone } = useDropZone(dropZoneEl, async (files) => {
  if (!files?.length) {
    toast.error('No files selected')
    return
  }

  try {
    const file = files[0]!
    await font.loadFontFile(file)
    toast.success('Font loaded successfully')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'An unknown error occurred')
  }
})
</script>

<template>
  <div
    ref="dropZoneEl"
    :class="[
      'size-full cursor-pointer rounded-lg transition-colors hover:bg-muted border border-dashed',
      isOverDropZone && 'border-primary bg-muted',
    ]"
    @click="open()"
    tabindex="0"
  >
    <Empty class="size-full">
      <EmptyContent class="gap-2">
        <EmptyMedia>
          <Upload />
        </EmptyMedia>
        <EmptyTitle class="line-clamp-1">Drop Font File Here</EmptyTitle>
        <EmptyDescription>or click to browse (.ttf, .otf, .woff, .woff2)</EmptyDescription>
      </EmptyContent>
    </Empty>
  </div>
</template>
