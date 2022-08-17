<script lang="ts" setup>
const { data } = await useFetch('/api/almanac')
</script>

<template>
  <section>
    <Suspense>
      <div m-auto inline-block text-left>
        <div>
          宜: {{ data.yi.map(i => `${i.name}${i.emoji}`).join('、') }}
        </div>
        <div>
          忌: {{ data.ji.map(i => `${i.name}${i.emoji}`).join('、') }}
        </div>
        <div h-1px bg-gray-300 />
        <div>
          宜: {{ data.yiStr }}
        </div>
        <div>
          忌: {{ data.jiStr }}
        </div>
      </div>
    </Suspense>
  </section>
</template>
