<script setup lang="ts">
import AppLayout from './AppLayout.vue'
import AppToastProvider from './AppToastProvider.vue'
import AppToolTipProvider from './AppToolTipProvider.vue'
import ToolTabs from './ToolTabs.vue'
</script>

<template>
  <AppToastProvider>
    <AppToolTipProvider>
      <AppLayout>
        <ToolTabs />
      </AppLayout>
    </AppToolTipProvider>
  </AppToastProvider>
</template>
