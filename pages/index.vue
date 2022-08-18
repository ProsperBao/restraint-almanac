<script lang="ts" setup>
import type { Keyword } from '~~/data/match'

const { data } = await useFetch('/api/almanac')
const list: [string, Keyword[]][] = [['宜', data.value.yi], ['忌', data.value.ji]]
</script>

<template>
  <section>
    <Suspense>
      <div>
        <div mb-10 mt-10 text-lg>
          自律人今天不懂吃啥？看看食材黄历吧！
        </div>
        <div m-auto inline-block text-left w-100 border border-rounded shadow>
          <div v-for="(item, idx) in list" :key="item[0]" flex items-center :class="{ 'border-b': idx === 0 }">
            <div p-4 text-xl>
              {{ item[0] }}
            </div>
            <div p-4 flex gap-2 flex-wrap border-l>
              <EmojiTag v-for="keyword in item[1]" :key="keyword.name" :keyword="keyword" />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  </section>
</template>
