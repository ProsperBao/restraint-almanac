<script lang="ts" setup>
const { data } = await useFetch('/api/almanac')
</script>

<template>
  <section>
    <Suspense>
      {{ data.html }}
    </Suspense>
  </section>
</template>
