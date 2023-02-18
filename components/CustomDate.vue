<script lang="ts" setup>
import dayjs from 'dayjs'

const props = defineProps<{ modelValue: Date }>()
const emits = defineEmits(['update:modelValue'])
const date = useVModel(props, 'modelValue', emits)

const formatterKey = ['YEAR', 'MONTH', 'DAY']

const prevDay = () => {
  date.value = dayjs(date.value).subtract(1, 'day').toDate()
}
const nextDay = () => {
  date.value = dayjs(date.value).add(1, 'day').toDate()
}
</script>

<template>
  <section m-auto text-left w-100 mb-5>
    <article flex justify-between items-center>
      <button class="custom-card" @click="prevDay">
        上一天
      </button>
      <div flex items-center justify-around gap-x-2>
        <template v-for="(d, idx) in formatterKey" :key="d">
          <CustomDatePanel v-model="date" :mode="d" />
          <template v-if="idx !== formatterKey.length - 1">
            -
          </template>
        </template>
      </div>
      <button class="custom-card" @click="nextDay">
        下一天
      </button>
    </article>
  </section>
</template>
