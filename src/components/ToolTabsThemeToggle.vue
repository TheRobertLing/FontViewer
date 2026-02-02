<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button @click="toggleDark()" variant="ghost" class="rounded-full" size="icon-sm">
        <transition name="spin-fade" mode="out-in">
          <Sun v-if="!isDark" />
          <Moon v-else />
        </transition>
      </Button>
    </TooltipTrigger>
    <TooltipContent>Theme Toggle</TooltipContent>
  </Tooltip>
</template>

<style scoped>
.spin-fade-enter-active,
.spin-fade-leave-active {
  transition: transform 0.1s ease, opacity 0.1s ease;
}

.spin-fade-enter-from {
  transform: rotate(-180deg);
  opacity: 0;
}

.spin-fade-leave-to {
  transform: rotate(180deg);
  opacity: 0;
}
</style>
