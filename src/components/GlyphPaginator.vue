<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination'
import { NumberField, NumberFieldContent, NumberFieldInput } from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'

const page = defineModel<number>({ required: true })

defineProps<{
  itemsPerPage: number
  total: number
}>()
</script>

<template>
  <Pagination
    v-slot="{ pageCount }"
    :items-per-page="itemsPerPage"
    :total="total"
    v-model:page="page"
  >
    <PaginationContent>
      <PaginationFirst size="icon-sm">
        <ChevronsLeft />
      </PaginationFirst>
      <PaginationPrevious size="icon-sm">
        <ChevronLeft />
      </PaginationPrevious>

      <NumberField
        id="page"
        class="mx-2 flex items-baseline"
        :format-options="{
          useGrouping: false,
        }"
        :min="1"
        :max="pageCount"
        :model-value="page"
        @update:model-value="
          (val) => {
            if (!val) return
            page = val
          }
        "
        invert-wheel-change
      >
        <NumberFieldContent>
          <NumberFieldInput class="w-10 h-8 leading-8" />
        </NumberFieldContent>
        <Label for="page">of {{ pageCount }}</Label>
      </NumberField>

      <PaginationNext size="icon-sm">
        <ChevronRight />
      </PaginationNext>
      <PaginationLast size="icon-sm">
        <ChevronsRight />
      </PaginationLast>
    </PaginationContent>
  </Pagination>
</template>
