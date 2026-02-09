<script setup lang="ts">
import { useDark } from '@vueuse/core'
import AppToasterProvider from '@/components/app/providers/AppToasterProvider.vue'
import AppSidebarTabsProvider from '@/components/app/providers/AppSidebarTabsProvider.vue'
import AppSidebar from '@/components/app/layout/AppSidebar.vue'
import AppSidebarInset from '@/components/app/layout/AppSidebarInset.vue'

useDark()
</script>

<template>
  <AppToasterProvider>
    <AppSidebarTabsProvider>
      <AppSidebar />
      <AppSidebarInset />
    </AppSidebarTabsProvider>
  </AppToasterProvider>
</template>
