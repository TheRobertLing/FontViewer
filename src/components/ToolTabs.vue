<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TextSearch, Upload } from 'lucide-vue-next'
import { shallowRef } from 'vue'

import ToolTabsTitle from './ToolTabsTitle.vue'
import ToolTabsThemeToggle from './ToolTabsThemeToggle.vue'
import ToolTabsGithubLink from './ToolTabsGithubLink.vue'
import ToolTabsLoadFont from './ToolTabsLoadFont.vue'
import GlyphInspector from './GlyphInspector.vue'
import type { LoadedFont } from '@/types'

const loadedFont = shallowRef<LoadedFont | null>(null)
</script>

<template>
  <Tabs class="gap-0 size-full" default-value="font-loader">
    <header
      class="w-full flex items-center justify-between gap-1 border border-b-0 bg-card rounded-t-[calc(var(--spacing)*6)]"
    >
      <div class="flex gap-1 items-center border-r h-full p-2">
        <ToolTabsTitle />
      </div>

      <ScrollArea class="size-full overflow-x-auto flex-1 p-1">
        <TabsList loop class="bg-transparent gap-1 justify-start h-full shrink-0 rounded-none">
          <TabsTrigger value="font-loader" class="rounded-full grow-0 shrink-0 h-8 px-4">
            <Upload />
            <span>Load Font</span>
          </TabsTrigger>

          <TabsTrigger value="glyph-inspector" class="rounded-full grow-0 shrink-0 h-8 px-4">
            <TextSearch />
            <span>Glyph Viewer</span>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div class="flex gap-1 border-l h-full items-center p-2">
        <ToolTabsThemeToggle />
        <ToolTabsGithubLink href="https://github.com/TheRobertLing/FontViewer" />
      </div>
    </header>
    <main class="flex-1 border rounded-b-[calc(var(--spacing)*6)] min-h-0 bg-card">
      <TabsContent value="font-loader" class="h-full">
        <ToolTabsLoadFont v-model="loadedFont" />
      </TabsContent>

      <TabsContent value="glyph-inspector" class="h-full">
        <GlyphInspector :loadedFont="loadedFont" />
      </TabsContent>
    </main>
  </Tabs>
</template>
