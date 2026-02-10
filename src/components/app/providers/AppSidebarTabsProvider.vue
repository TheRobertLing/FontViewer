<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar'
import { Tabs } from '@/components/ui/tabs'
import { useFontToolTabsProvider } from '@/composables/font-tool-tabs'

const { activeTab } = useFontToolTabsProvider()
</script>

<template>
  <Tabs orientation="vertical" v-model="activeTab" :unmount-on-hide="false">
    <SidebarProvider>
      <slot />
    </SidebarProvider>
  </Tabs>
</template>
