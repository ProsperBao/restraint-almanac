<script lang="ts" setup>
const { data } = await useFetch('/api/almanac')
</script>

<template>
  <img src="http://localhost:3000/api/almanac/picture" absolute left="50%" transform translate="x--50%" opacity-70>
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
      {{ item.title }}: {{ item.str }}
    </div>
  </div>
</template>
