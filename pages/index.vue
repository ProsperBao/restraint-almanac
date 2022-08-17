<script lang="ts" setup>
const { data } = await useFetch('/api/almanac')
</script>

<template>
  <section>
    <Suspense>
      <div>
        <div mb-10 mt-10 text-lg>
          自律人今天不懂吃啥？看看食材黄历吧！
        </div>
        <div m-auto inline-block text-left>
          <div>
            宜: {{ data.yi.map(i => `${i.name}${i.emoji}`).join('、') }}
          </div>
          <div>
            忌: {{ data.ji.map(i => `${i.name}${i.emoji}`).join('、') }}
          </div>
          <div h-1px bg-gray-300 my-10 />
          <div>
            宜: {{ data.yiStr }}
          </div>
          <div>
            忌: {{ data.jiStr }}
          </div>
        </div>
      </div>
    </Suspense>
  </section>
</template>
