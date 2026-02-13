<script setup lang="ts">
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  index: number
  name: string
  unicode: number | undefined
  unicodes: number[]
  character: string | null
  advanceWidth: number
  leftSideBearing: number
  numberOfContours: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}>()

function formatUnicode(code: number) {
  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0')
}

const copiedKey = ref<string | null>(null)

async function copyValue(key: string, value: string) {
  await navigator.clipboard.writeText(value)
  copiedKey.value = key
  setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = null
  }, 1500)
}

const rows = [
  { key: 'index', label: 'Index', value: () => String(props.index) },
  { key: 'name', label: 'Name', value: () => props.name || '—' },
  { key: 'character', label: 'Character', value: () => props.character ?? '—' },
  {
    key: 'unicode',
    label: 'Unicode',
    value: () => (props.unicodes.length > 0 ? props.unicodes.map(formatUnicode).join(', ') : '—'),
  },
  { key: 'advanceWidth', label: 'Advance Width', value: () => String(props.advanceWidth) },
  {
    key: 'leftSideBearing',
    label: 'Left Side Bearing',
    value: () => String(props.leftSideBearing),
  },
  { key: 'contours', label: 'Contours', value: () => String(props.numberOfContours) },
  {
    key: 'bbox',
    label: 'Bounding Box',
    value: () => `(${props.xMin}, ${props.yMin}) — (${props.xMax}, ${props.yMax})`,
  },
] as const
</script>

<template>
  <Table class="table-fixed">
    <TableBody>
      <TableRow v-for="row in rows" :key="row.key">
        <TableCell class="font-medium text-muted-foreground">{{ row.label }}</TableCell>
        <TableCell class="tabular-nums">{{ row.value() }}</TableCell>
        <TableCell class="text-right">
          <Button variant="ghost" size="icon-sm" @click="copyValue(row.key, row.value())">
            <Check v-if="copiedKey === row.key" />
            <Copy v-else />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
