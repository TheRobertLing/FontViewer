<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TextSearch, Upload } from 'lucide-vue-next'
import AppThemeToggle from './components/app/AppThemeToggle.vue'
import AppTitle from './components/app/AppTitle.vue'
import AppLogo from './components/app/AppLogo.vue'
import AppGithubLink from './components/app/AppGithubLink.vue'
import FontLoaderTab from './components/app/FontLoaderTab.vue'
import GlyphInspectorTab from './components/app/GlyphInspectorTab.vue'
</script>

<template>
  <div class="flex flex-col h-dvh">
    <header class="border-b p-2">
      <div class="flex max-w-5xl w-full mx-auto justify-between items-center">
        <div class="flex items-center gap-2 p-1">
          <AppLogo />
          <AppTitle />
        </div>
        <div class="flex items-center gap-1">
          <AppThemeToggle title="Toggle Theme" />
          <AppGithubLink title="Github" />
        </div>
      </div>
    </header>
    <main class="flex-1 min-h-0 p-2">
      <Tabs default-value="font-loader" class="max-w-5xl mx-auto size-full gap-2">
        <TabsList class="w-full gap-1" loop>
          <TabsTrigger value="font-loader"> <Upload /> Font Loader </TabsTrigger>
          <TabsTrigger value="glyph-inspector"> <TextSearch /> Glyph Inspector </TabsTrigger>
        </TabsList>
        <TabsContent value="font-loader" class="overflow-hidden">
          <FontLoaderTab class="size-full" />
        </TabsContent>
        <TabsContent value="glyph-inspector" class="overflow-hidden">
          <GlyphInspectorTab class="size-full" />
        </TabsContent>
      </Tabs>
    </main>
  </div>

  <Toaster position="bottom-right" closeButtonPosition="top-right" rich-colors closeButton expand />
</template>
