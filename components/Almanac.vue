<script lang="ts" setup>
import dayjs from 'dayjs'
import type { AlmanacResult } from '~~/utils/almanac'

const currentDate = ref(new Date())
const { data, refresh, pending } = await useFetch<AlmanacResult>(() => `/api/almanac?time=${dayjs(currentDate.value).format('YYYY-MM-DD')}`)

watch(() => currentDate.value, () => refresh())
</script>

<template>
  <section relative>
    <CustomDate v-model="currentDate" />
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
    <div v-if="pending" absolute w-full h-full left-0 top-0 flex justify-center items-center bg-white opacity-80>
      Loading...
    </div>
  </section>
  <hr my-10>
  <div text-left w-100 m-auto>
    <div v-for="item in data" :key="item.title">
      {{ item.title }}: {{ item.str }}
    </div>
  </div>
</template>
