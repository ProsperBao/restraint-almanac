<script setup lang="ts">
import type { Keyword } from '~~/data/match'
defineProps<{ keyword: Keyword }>()
</script>

<template>
  <div inline-block border border-rounded px-2 shadow>
    <div>
      <span v-if="keyword.emoji" m-r-1>{{ keyword.emoji }}</span>
      <span>{{ keyword.name }}</span>
    </div>
  </div>
</template>
