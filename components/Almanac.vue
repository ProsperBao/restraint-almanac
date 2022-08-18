<script lang="ts" setup>
const { data } = await useFetch('/api/almanac')
</script>

<template>
  <div mb-10 mt-10 text-lg>
    自律人今天不懂吃啥？看看食材黄历吧！
  </div>
  <div v-if="isCard" m-auto inline-block text-left w-100 border border-rounded shadow>
    <div v-for="(item, idx) in data" :key="item.title" flex items-center :class="{ 'border-b': idx === 0 }">
      <div p-4 text-xl>
        {{ item.title }}
      </div>
      <div p-4 flex gap-2 flex-wrap border-l>
        <EmojiTag v-for="keyword in item.list" :key="keyword.name" :keyword="keyword" />
      </div>
    </div>
  </div>
  <div v-else text-left w-100 m-auto>
    <div v-for="item in data" :key="item.title">
      {{ item.title }}: {{ item.list.map(keyword => `${keyword.emoji} ${keyword.name}`).join('、') }}
    </div>
  </div>
  <hr my-10>
  <div text-left w-100 m-auto>
    <div v-for="item in data" :key="item.title">
      宜: {{ item.str }}
    </div>
  </div>
</template>
