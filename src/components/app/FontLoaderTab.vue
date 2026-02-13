<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import FileUploadDropZone from './FileUploadDropZone.vue'
import LoadedFontFile from './LoadedFontFile.vue'
</script>

<template>
  <Card class="gap-4 py-4">
    <CardHeader class="px-4 gap-0">
      <LoadedFontFile />
    </CardHeader>
    <CardContent class="flex-1 px-4">
      <FileUploadDropZone />
    </CardContent>
  </Card>
</template>
