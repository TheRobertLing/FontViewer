<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { NumberField, NumberFieldContent, NumberFieldInput } from '../ui/number-field'
import { Label } from '../ui/label'
import { useFontFileDataStore } from '@/stores/font-store'

const font = useFontFileDataStore()
</script>

<template>
  <Pagination
    v-slot="{ pageCount }"
    :items-per-page="1"
    :total="font.numGlyphs"
    v-model:page="font.currentGlyph"
  >
    <PaginationContent>
      <PaginationFirst size="icon-sm" class="hidden sm:inline">
        <ChevronsLeft />
      </PaginationFirst>
      <PaginationPrevious size="icon-sm">
        <ChevronLeft />
      </PaginationPrevious>

      <NumberField
        id="page"
        class="mx-2 flex items-center"
        :format-options="{
          useGrouping: false,
        }"
        :min="1"
        :max="pageCount"
        :model-value="font.currentGlyph"
        @update:model-value="
          (val) => {
            if (!val) return
            font.currentGlyph = val
          }
        "
        invert-wheel-change
      >
        <NumberFieldContent>
          <NumberFieldInput class="w-16 h-8 leading-8" />
        </NumberFieldContent>
        <Label for="page">of {{ pageCount }}</Label>
      </NumberField>

      <PaginationNext size="icon-sm">
        <ChevronRight />
      </PaginationNext>
      <PaginationLast size="icon-sm" class="hidden sm:inline">
        <ChevronsRight />
      </PaginationLast>
    </PaginationContent>
  </Pagination>
</template>
