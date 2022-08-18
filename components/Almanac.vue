<script lang="ts" setup>
import type { Keyword } from '~~/data/match'

const { data } = await useFetch('/api/almanac')
const list: [string, Keyword[]][] = [['宜', data.value.yi], ['忌', data.value.ji]]
</script>

<template>
  <div mb-10 mt-10 text-lg>
    自律人今天不懂吃啥？看看食材黄历吧！
  </div>
  <div v-if="isCard" m-auto inline-block text-left w-100 border border-rounded shadow>
    <div v-for="(item, idx) in list" :key="item[0]" flex items-center :class="{ 'border-b': idx === 0 }">
      <div p-4 text-xl>
        {{ item[0] }}
      </div>
      <div p-4 flex gap-2 flex-wrap border-l>
        <EmojiTag v-for="keyword in item[1]" :key="keyword.name" :keyword="keyword" />
      </div>
    </div>
  </div>
  <div v-else text-left w-100 m-auto>
    <div v-for="item in list" :key="item[0]">
      {{ item[0] }}: {{ item[1].map(keyword => `${keyword.emoji} ${keyword.name}`).join('、') }}
    </div>
  </div>
  <hr my-10>
  <div text-left w-100 m-auto>
    <div>宜: {{ data.yiStr }}</div>
    <div>忌: {{ data.jiStr }}</div>
  </div>
</template>
