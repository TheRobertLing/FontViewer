import FontLoader from '@/components/app/tools/FontLoader.vue'
import GlyphInspector from '@/components/app/tools/glyph-inspector/GlyphInspector.vue'
import { useFontStore } from '@/stores/font-store'
import { createInjectionState } from '@vueuse/core'
import { TextSearch, Upload } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { ref, watch, type Component } from 'vue'

interface TabItem {
  id: string
  name: string
  icon: Component
  content: Component
  disabled: boolean
}

const [useFontToolTabsProvider, useFontToolTabsContext] = createInjectionState(() => {
  const { font } = storeToRefs(useFontStore())

  const tabs = ref<[TabItem, TabItem]>([
    {
      id: 'Font Loader',
      name: 'Font Loader',
      icon: Upload,
      content: FontLoader,
      disabled: false,
    },
    {
      id: 'Glyph Inspector',
      name: 'Glyph Inspector',
      icon: TextSearch,
      content: GlyphInspector,
      disabled: true,
    },
  ])

  const activeTab = ref(tabs.value[0].id)

  watch(font, () => {
    if (font.value) {
      tabs.value.forEach((tab) => {
        if (tab.id !== 'Font Loader') {
          tab.disabled = false
        }
      })
    } else {
      tabs.value.forEach((tab) => {
        if (tab.id !== 'Font Loader') {
          tab.disabled = true
        }
      })

      activeTab.value = tabs.value[0].id
    }
  })

  return { tabs, activeTab }
})

export { useFontToolTabsProvider, useFontToolTabsContext }
