<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button @click="toggleDark()" size="icon" variant="ghost">
    <transition name="spin-fade" mode="out-in">
      <Sun v-if="!isDark" />
      <Moon v-else />
    </transition>
  </Button>
</template>

<style scoped>
.spin-fade-enter-active,
.spin-fade-leave-active {
  transition:
    transform 0.1s ease,
    opacity 0.1s ease;
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
