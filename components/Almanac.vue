<script lang="ts" setup>
import dayjs from 'dayjs'
import { isCard } from '~~/composables/card'
import type { AlmanacResult } from '~~/utils/almanac'

const lang = ref()
const currentDate = ref(new Date())
const { data, refresh, pending } = await useFetch<AlmanacResult>(() => `/api/almanac?time=${dayjs(currentDate.value).format('YYYY-MM-DD')}${lang.value ? `&lang=${lang.value}` : ''}`)

watch(() => currentDate.value, () => refresh())
</script>

<template>
  <section relative>
    <div m-auto flex justify-between mb-4 w-100 gap-x-2>
      <button class="custom-card" @click="lang = ''">
        中文
      </button>
      <button class="custom-card" @click="lang = 'en'">
        English
      </button>
      <button class="custom-card" @click="lang = 'jp'">
        日本語
      </button>
    </div>
    <CustomDate v-model="currentDate" />
    <div v-if="isCard" m-auto inline-block text-left w-100 p-0 class="custom-card">
      <div v-for="(item, idx) in data" :key="item.title" flex items-center :class="{ 'border-b': idx === 0 }">
        <div p-4 text-xl w-26 ws-nowrap flex-shrink-0 text-center>
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
  <hr v-if="!lang" my-10>
  <div v-if="!lang" text-left w-100 m-auto>
    <div v-for="item in data" :key="item.title">
      {{ item.title }}: {{ item.str }}
    </div>
  </div>
</template>
