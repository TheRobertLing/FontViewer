<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useSidebar } from './utils'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { KbdGroup, Kbd } from '@/components/ui/kbd'

defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        @click="toggleSidebar"
      >
        <PanelLeft />
        <span class="sr-only">Toggle Sidebar</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" align="start">
      <div class="flex items-center gap-2">
        Toggle Sidebar
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>B</Kbd>
        </KbdGroup>
      </div>
    </TooltipContent>
  </Tooltip>
</template>
