<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFontToolTabsContext } from '@/composables/font-tool-tabs'
import AppSidebarTitle from './AppSidebarTitle.vue'
import AppSidebarThemeToggle from './AppSidebarThemeToggle.vue'
import AppSidebarGithubLink from './AppSidebarGithubLink.vue'

const { tabs } = useFontToolTabsContext()!
</script>

<template>
  <Sidebar variant="inset">
    <SidebarHeader>
      <AppSidebarTitle />
    </SidebarHeader>
    <SidebarSeparator class="mx-0" />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Font Tools</SidebarGroupLabel>
        <SidebarGroupContent>
          <TabsList class="w-full h-auto flex flex-col bg-transparent gap-1 p-0" loop>
            <TabsTrigger
              v-for="tab in tabs"
              :key="tab.id"
              :value="tab.id"
              :disabled="tab.disabled"
              class="flex flex-initial w-full items-center justify-start gap-2 overflow-hidden rounded-md p-2 h-8 border-0 text-left text-sm font-normal outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:outline-0 focus-visible:border-transparent active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:bg-sidebar-accent data-[state=active]:font-medium data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none dark:text-foreground dark:data-[state=active]:bg-sidebar-accent dark:data-[state=active]:text-sidebar-accent-foreground dark:data-[state=active]:border-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0"
            >
              <component v-if="tab.icon" :is="tab.icon" /> {{ tab.name }}
            </TabsTrigger>
          </TabsList>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <AppSidebarThemeToggle />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <AppSidebarGithubLink />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
