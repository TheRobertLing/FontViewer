<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

import 'vue-sonner/style.css'
</script>

<template>
  <slot />
  <Toaster
    position="bottom-right"
    closeButtonPosition="top-right"
    rich-colors
    closeButton
    expand
  />
</template>
