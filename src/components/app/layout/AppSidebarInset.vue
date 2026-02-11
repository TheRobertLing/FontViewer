<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { TabsContent } from '@/components/ui/tabs'
import { useFontToolTabsContext } from '@/composables/font-tool-tabs'

const { tabs, activeTab } = useFontToolTabsContext()!
</script>

<template>
  <SidebarInset>
    <header class="flex shrink-0 items-center gap-2 border-b p-2">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>FontViewer</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ activeTab }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
    <TabsContent v-for="tab in tabs" :key="tab.id" :value="tab.id" class="overflow-auto">
      <component :is="tab.content" />
    </TabsContent>
  </SidebarInset>
</template>
