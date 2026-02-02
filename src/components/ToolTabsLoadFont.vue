<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { LoadedFont } from '@/types'
import { useFileDialog } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { parse } from 'opentype.js'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'

const loadedFont = defineModel<LoadedFont | null>({ required: true })

const ACCEPTED_EXTENSIONS = ['.ttf', '.otf', '.woff'] as const

const { open, onChange } = useFileDialog({
  accept: ACCEPTED_EXTENSIONS.join(','),
  multiple: false,
  reset: true,
})

onChange(async (files) => {
  if (!files?.length) return

  const file = files[0]!
  const lowerName = file.name.toLowerCase()

  if (!ACCEPTED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
    toast.error('Invalid file type. Accepted formats: .ttf, .otf, .woff.')
    return
  }

  try {
    const buffer = await file.arrayBuffer()
    const font = parse(buffer)

    const fileSize =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(2)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`

    loadedFont.value = { font, fileName: file.name, fileSize }
    toast.success(`Loaded font: ${file.name}`)
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to parse font')
  }
})
</script>

<template>
  <div class="size-full p-4 flex flex-col items-center justify-center">
    <Empty class="border border-dashed w-full rounded-xl">
      <EmptyHeader>
        <EmptyTitle>{{ loadedFont ? loadedFont.fileName : 'Load Font File' }}</EmptyTitle>
        <EmptyDescription>
          {{ loadedFont ? loadedFont.fileSize : 'Supported formats: .ttf, .otf, .woff' }}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" @click="open()">
          {{ loadedFont ? 'Change Font File' : 'Choose Font File' }}
        </Button>
      </EmptyContent>
    </Empty>
  </div>
</template>
