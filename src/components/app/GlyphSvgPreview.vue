<script setup lang="ts">
defineProps<{
  path: string
  viewBox: string
}>()
</script>

<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <path :d="path" fill="currentColor" />
  </svg>
</template>
